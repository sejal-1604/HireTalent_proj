const express = require('express');
const { Application, Job, User } = require('../models');
const auth = require('../middleware/auth');
const { validateApplication } = require('../middleware/validation');
const router = express.Router();
 
// @route   POST /api/applications
// @desc    Create new application (matches createApplication in firestore.ts)
// @access  Private
router.post('/', auth, validateApplication, async (req, res) => {
  try {
    const {
      jobId,
      candidateInfo,
      coverLetter,
      portfolio,
      resumeUrl
    } = req.body;
 
    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
 
    // Check if user already applied
    const existingApplication = await Application.findOne({
      jobId,
      candidateId: req.user.userId
    });
 
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this job'
      });
    }
 
    const application = new Application({
      jobId,
      candidateId: req.user.userId,
      candidateInfo,
      coverLetter,
      portfolio,
      resume: resumeUrl ? {
        url: resumeUrl,
        uploadDate: new Date()
      } : undefined,
      status: 'new'
    });
 
    await application.save();
 
    // Update job application count
    await Job.findByIdAndUpdate(jobId, {
      $inc: { applicationCount: 1 }
    });
 
    // Populate references
    await application.populate([
      { path: 'jobId', select: 'title company location' },
      { path: 'candidateId', select: 'displayName email' }
    ]);
 
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: { application }
    });
  } catch (error) {
    console.error('Create application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application',
      error: error.message
    });
  }
});
 
// @route   GET /api/applications/job/:jobId
// @desc    Get applications for a job (matches getJobApplications in firestore.ts)
// @access  Private
router.get('/job/:jobId', auth, async (req, res) => {
  try {
    const { jobId } = req.params;
 
    // Check if user owns the job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
 
    if (job.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
 
    const applications = await Application.find({ jobId })
      .populate('candidateId', 'displayName email avatar')
      .populate('jobId', 'title')
      .sort({ createdAt: -1 });
 
    res.json({
      success: true,
      data: { applications }
    });
  } catch (error) {
    console.error('Get job applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications',
      error: error.message
    });
  }
});
 
// @route   GET /api/applications/user/:userId
// @desc    Get applications by user (matches getUserApplications in firestore.ts)
// @access  Private
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
 
    // Ensure user can only access their own applications
    if (req.user.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
 
    const applications = await Application.find({ candidateId: userId })
      .populate('jobId', 'title company location status')
      .populate('candidateId', 'displayName email')
      .sort({ createdAt: -1 });
 
    res.json({
      success: true,
      data: { applications }
    });
  } catch (error) {
    console.error('Get user applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications',
      error: error.message
    });
  }
});
 
// @route   PUT /api/applications/:id/status
// @desc    Update application status
// @access  Private
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status, reason } = req.body;
    const applicationId = req.params.id;
 
    const application = await Application.findById(applicationId)
      .populate('jobId');
 
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
 
    // Check if user owns the job
    if (application.jobId.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
 
    // Update status and add to history
    application.status = status;
    application.statusHistory.push({
      status,
      changedBy: req.user.userId,
      changedAt: new Date(),
      reason
    });
 
    await application.save();
 
    res.json({
      success: true,
      message: 'Application status updated successfully',
      data: { application }
    });
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update application status',
      error: error.message
    });
  }
});
 
module.exports = router;