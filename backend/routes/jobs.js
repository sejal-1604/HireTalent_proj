const express = require('express');
const { Job, Application } = require('../models');
const auth = require('../middleware/auth');
const { validateJob } = require('../middleware/validation');
const router = express.Router();
 
// @route   POST /api/jobs
// @desc    Create new job (matches JobGenerator.tsx saveJob & publishJob)
// @access  Private
router.post('/', auth, validateJob, async (req, res) => {
  try {
    const {
      title,
      description,
      type: jobType,
      location,
      keywords,
      status = 'draft',
      salary,
      requirements,
      skills,
      department,
      applicationDeadline
    } = req.body;
 
    const job = new Job({
      title,
      description,
      jobType,
      location,
      keywords: keywords ? keywords.split(',').map(k => k.trim()) : [],
      status,
      salary,
      requirements,
      skills,
      department,
      applicationDeadline,
      createdBy: req.user.userId
    });
 
    await job.save();
 
    // Populate creator info
    await job.populate('createdBy', 'displayName email');
 
    res.status(201).json({
      success: true,
      message: status === 'published' ? 'Job published successfully' : 'Job saved as draft',
      data: { job }
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create job',
      error: error.message
    });
  }
});
 
// @route   GET /api/jobs
// @desc    Get all jobs (matches getAllJobs in firestore.ts)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { status = 'published', page = 1, limit = 10, search } = req.query;
    
    const query = { status, isActive: true };
    
    // Add search functionality
    if (search) {
      query.$text = { $search: search };
    }
 
    const jobs = await Job.find(query)
      .populate('createdBy', 'displayName company')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
 
    const total = await Job.countDocuments(query);
 
    res.json({
      success: true,
      data: {
        jobs,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch jobs',
      error: error.message
    });
  }
});
 
// @route   GET /api/jobs/user/:userId
// @desc    Get jobs by user (matches getUserJobs in firestore.ts)
// @access  Private
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Ensure user can only access their own jobs or admin
    if (req.user.userId !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
 
    const jobs = await Job.find({ createdBy: userId })
      .populate('createdBy', 'displayName email')
      .sort({ createdAt: -1 });
 
    // Add application count for each job
    const jobsWithStats = await Promise.all(
      jobs.map(async (job) => {
        const applicationCount = await Application.countDocuments({ jobId: job._id });
        return {
          ...job.toJSON(),
          applicationCount
        };
      })
    );
 
    res.json({
      success: true,
      data: { jobs: jobsWithStats }
    });
  } catch (error) {
    console.error('Get user jobs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user jobs',
      error: error.message
    });
  }
});
 
// @route   GET /api/jobs/:id
// @desc    Get single job by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('createdBy', 'displayName company email');
 
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
 
    // Increment view count
    job.views += 1;
    await job.save();
 
    res.json({
      success: true,
      data: { job }
    });
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch job',
      error: error.message
    });
  }
});
 
// @route   PUT /api/jobs/:id
// @desc    Update job
// @access  Private
router.put('/:id', auth, validateJob, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
 
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
 
    // Check if user owns the job
    if (job.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
 
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).populate('createdBy', 'displayName email');
 
    res.json({
      success: true,
      message: 'Job updated successfully',
      data: { job: updatedJob }
    });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update job',
      error: error.message
    });
  }
});
 
// @route   DELETE /api/jobs/:id
// @desc    Delete job
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
 
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
 
    // Check if user owns the job
    if (job.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
 
    await Job.findByIdAndDelete(req.params.id);
 
    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete job',
      error: error.message
    });
  }
});
 
// @route   POST /api/jobs/generate-description
// @desc    Generate job description using AI (matches JobGenerator.tsx)
// @access  Private
router.post('/generate-description', auth, async (req, res) => {
  try {
    const { jobTitle, jobType, jobLocation, keywords } = req.body;
 
    if (!jobTitle) {
      return res.status(400).json({
        success: false,
        message: 'Job title is required'
      });
    }
 
    // Simulated AI response (replace with actual OpenAI integration)
    const generatedDescription = `
# ${jobTitle} (${jobType.charAt(0).toUpperCase() + jobType.slice(1)})
 
## About the Role
We are seeking a talented ${jobTitle} to join our team ${jobLocation ? `in ${jobLocation}` : ''}. This is an exciting opportunity to work with cutting-edge technology and contribute to impactful projects.
 
## Responsibilities
- Design and develop innovative solutions
- Collaborate with cross-functional teams
- Implement best practices and coding standards
- Participate in code reviews and technical discussions
- Stay updated with industry trends and technologies
 
## Requirements
- Strong experience in relevant technologies
- Excellent communication and teamwork skills
- Problem-solving mindset and attention to detail
- Ability to work independently and in a team environment
- Passion for learning and professional growth
 
## Benefits
- Competitive salary and benefits package
- Professional development opportunities
- Flexible work arrangements
- Collaborative and inclusive work culture
- Opportunity to work on impactful projects
`;
 
    res.json({
      success: true,
      message: 'Description generated successfully',
      data: { description: generatedDescription }
    });
  } catch (error) {
    console.error('Generate description error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate job description',
      error: error.message
    });
  }
});
 
module.exports = router;