const express = require('express');
const { Job, Application, Interview, User } = require('../models');
const auth = require('../middleware/auth');
const router = express.Router();
 
// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics (matches Dashboard.tsx stats)
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);
 
    // Get statistics
    const [
      openPositions,
      newApplications,
      scheduledInterviews,
      hiredThisMonth
    ] = await Promise.all([
      // Open positions
      Job.countDocuments({
        createdBy: userId,
        status: 'published',
        isActive: true
      }),
      
      // New applications (last 7 days)
      Application.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      }),
      
      // Scheduled interviews
      Interview.countDocuments({
        'interviewer.primary': userId,
        status: 'scheduled',
        scheduledDate: { $gte: new Date() }
      }),
      
      // Hired this month
      Application.countDocuments({
        status: 'hired',
        updatedAt: { $gte: currentMonth }
      })
    ]);
 
    res.json({
      success: true,
      data: {
        stats: {
          openPositions,
          newApplications,
          scheduledInterviews,
          hiredThisMonth
        }
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics',
      error: error.message
    });
  }
});
 
// @route   GET /api/dashboard/recent-applications
// @desc    Get recent applications (matches RecentApplications.tsx)
// @access  Private
router.get('/recent-applications', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const limit = parseInt(req.query.limit) || 5;
 
    // Get user's jobs first
    const userJobs = await Job.find({ createdBy: userId }).select('_id');
    const jobIds = userJobs.map(job => job._id);
 
    const recentApplications = await Application.find({
      jobId: { $in: jobIds }
    })
      .populate('candidateId', 'displayName email avatar')
      .populate('jobId', 'title')
      .sort({ createdAt: -1 })
      .limit(limit);
 
    res.json({
      success: true,
      data: { applications: recentApplications }
    });
  } catch (error) {
    console.error('Get recent applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recent applications',
      error: error.message
    });
  }
});
 
// @route   GET /api/dashboard/upcoming-interviews
// @desc    Get upcoming interviews (matches UpcomingInterviews.tsx)
// @access  Private
router.get('/upcoming-interviews', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const limit = parseInt(req.query.limit) || 5;
 
    const upcomingInterviews = await Interview.find({
      'interviewer.primary': userId,
      scheduledDate: { $gte: new Date() },
      status: { $in: ['scheduled', 'confirmed'] }
    })
      .populate('candidateId', 'displayName email avatar')
      .populate('jobId', 'title')
      .sort({ scheduledDate: 1 })
      .limit(limit);
 
    res.json({
      success: true,
      data: { interviews: upcomingInterviews }
    });
  } catch (error) {
    console.error('Get upcoming interviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch upcoming interviews',
      error: error.message
    });
  }
});
 
module.exports = router;