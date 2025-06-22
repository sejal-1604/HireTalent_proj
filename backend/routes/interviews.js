import express from 'express';
import { body, query, param } from 'express-validator';

const router = express.Router();

// Validation middleware
const createInterviewValidation = [
  body('applicationId').isMongoId().withMessage('Valid application ID is required'),
  body('jobId').isMongoId().withMessage('Valid job ID is required'),
  body('scheduledDate').isISO8601().withMessage('Valid scheduled date is required'),
  body('duration').isInt({ min: 15, max: 480 }).withMessage('Duration must be between 15 and 480 minutes'),
  body('type').isIn(['phone', 'video', 'in-person', 'panel']).withMessage('Invalid interview type'),
  body('round').isInt({ min: 1, max: 10 }).withMessage('Round must be between 1 and 10'),
  body('interviewerIds').isArray({ min: 1 }).withMessage('At least one interviewer is required'),
  body('interviewerIds.*').isMongoId().withMessage('Invalid interviewer ID'),
  body('location').optional().trim(),
  body('meetingLink').optional().isURL().withMessage('Meeting link must be a valid URL'),
  body('agenda').optional().trim(),
  body('notes').optional().trim()
];

const updateInterviewValidation = [
  body('scheduledDate').optional().isISO8601().withMessage('Valid scheduled date is required'),
  body('duration').optional().isInt({ min: 15, max: 480 }),
  body('type').optional().isIn(['phone', 'video', 'in-person', 'panel']),
  body('status').optional().isIn(['scheduled', 'in-progress', 'completed', 'cancelled', 'rescheduled', 'no-show']),
  body('interviewerIds').optional().isArray(),
  body('interviewerIds.*').optional().isMongoId(),
  body('location').optional().trim(),
  body('meetingLink').optional().isURL(),
  body('agenda').optional().trim(),
  body('notes').optional().trim()
];

const interviewQueryValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status').optional().isIn(['scheduled', 'in-progress', 'completed', 'cancelled', 'rescheduled', 'no-show']),
  query('type').optional().isIn(['phone', 'video', 'in-person', 'panel']),
  query('interviewerId').optional().isMongoId().withMessage('Invalid interviewer ID'),
  query('jobId').optional().isMongoId().withMessage('Invalid job ID'),
  query('dateFrom').optional().isISO8601().withMessage('Invalid date format'),
  query('dateTo').optional().isISO8601().withMessage('Invalid date format'),
  query('sortBy').optional().isIn(['scheduledDate', 'createdAt', 'updatedAt']),
  query('sortOrder').optional().isIn(['asc', 'desc'])
];

const feedbackValidation = [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('feedback').trim().isLength({ min: 10 }).withMessage('Feedback must be at least 10 characters'),
  body('strengths').optional().isArray().withMessage('Strengths must be an array'),
  body('weaknesses').optional().isArray().withMessage('Weaknesses must be an array'),
  body('recommendation').isIn(['hire', 'reject', 'maybe', 'next-round']).withMessage('Invalid recommendation'),
  body('technicalSkills').optional().isInt({ min: 1, max: 5 }),
  body('communicationSkills').optional().isInt({ min: 1, max: 5 }),
  body('culturalFit').optional().isInt({ min: 1, max: 5 }),
  body('overallImpression').optional().trim()
];

// @route   GET /api/v1/interviews
// @desc    Get all interviews with filtering and pagination
// @access  Private (Recruiter/Admin/Interviewer)
router.get('/', interviewQueryValidation, async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Get all interviews endpoint - to be implemented' });
});

// @route   GET /api/v1/interviews/:id
// @desc    Get single interview by ID
// @access  Private (Recruiter/Admin/Interviewer)
router.get('/:id', [
  param('id').isMongoId().withMessage('Invalid interview ID')
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Get single interview endpoint - to be implemented' });
});

// @route   POST /api/v1/interviews
// @desc    Schedule a new interview
// @access  Private (Recruiter/Admin)
router.post('/', createInterviewValidation, async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Create interview endpoint - to be implemented' });
});

// @route   PUT /api/v1/interviews/:id
// @desc    Update interview by ID
// @access  Private (Recruiter/Admin)
router.put('/:id', [
  param('id').isMongoId().withMessage('Invalid interview ID'),
  ...updateInterviewValidation
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Update interview endpoint - to be implemented' });
});

// @route   DELETE /api/v1/interviews/:id
// @desc    Cancel/Delete interview by ID
// @access  Private (Recruiter/Admin)
router.delete('/:id', [
  param('id').isMongoId().withMessage('Invalid interview ID')
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Delete interview endpoint - to be implemented' });
});

// @route   POST /api/v1/interviews/:id/reschedule
// @desc    Reschedule an interview
// @access  Private (Recruiter/Admin)
router.post('/:id/reschedule', [
  param('id').isMongoId().withMessage('Invalid interview ID'),
  body('newDate').isISO8601().withMessage('Valid new date is required'),
  body('reason').optional().trim(),
  body('notifyCandidate').optional().isBoolean()
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Reschedule interview endpoint - to be implemented' });
});

// @route   POST /api/v1/interviews/:id/start
// @desc    Start an interview (mark as in-progress)
// @access  Private (Interviewer)
router.post('/:id/start', [
  param('id').isMongoId().withMessage('Invalid interview ID')
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Start interview endpoint - to be implemented' });
});

// @route   POST /api/v1/interviews/:id/complete
// @desc    Complete an interview
// @access  Private (Interviewer)
router.post('/:id/complete', [
  param('id').isMongoId().withMessage('Invalid interview ID'),
  body('actualDuration').optional().isInt({ min: 1 }),
  body('notes').optional().trim()
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Complete interview endpoint - to be implemented' });
});

// @route   POST /api/v1/interviews/:id/feedback
// @desc    Submit interview feedback
// @access  Private (Interviewer)
router.post('/:id/feedback', [
  param('id').isMongoId().withMessage('Invalid interview ID'),
  ...feedbackValidation
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Submit interview feedback endpoint - to be implemented' });
});

// @route   GET /api/v1/interviews/:id/feedback
// @desc    Get interview feedback
// @access  Private (Recruiter/Admin)
router.get('/:id/feedback', [
  param('id').isMongoId().withMessage('Invalid interview ID')
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Get interview feedback endpoint - to be implemented' });
});

// @route   POST /api/v1/interviews/:id/send-reminder
// @desc    Send interview reminder to candidate and interviewers
// @access  Private (Recruiter/Admin)
router.post('/:id/send-reminder', [
  param('id').isMongoId().withMessage('Invalid interview ID'),
  body('reminderType').isIn(['24-hours', '2-hours', '30-minutes', 'custom']),
  body('customMessage').optional().trim()
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Send interview reminder endpoint - to be implemented' });
});

// @route   POST /api/v1/interviews/:id/generate-calendar-event
// @desc    Generate calendar event for interview
// @access  Private (Recruiter/Admin)
router.post('/:id/generate-calendar-event', [
  param('id').isMongoId().withMessage('Invalid interview ID'),
  body('attendees').optional().isArray().withMessage('Attendees must be an array'),
  body('sendInvites').optional().isBoolean()
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Generate calendar event endpoint - to be implemented' });
});

// @route   GET /api/v1/interviews/calendar/:userId
// @desc    Get calendar view of interviews for a user
// @access  Private (Recruiter/Admin/Interviewer)
router.get('/calendar/:userId', [
  param('userId').isMongoId().withMessage('Invalid user ID'),
  query('month').optional().isInt({ min: 1, max: 12 }),
  query('year').optional().isInt({ min: 2020, max: 2030 }),
  query('view').optional().isIn(['month', 'week', 'day'])
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Get calendar view endpoint - to be implemented' });
});

// @route   GET /api/v1/interviews/availability/:userId
// @desc    Get interviewer availability
// @access  Private (Recruiter/Admin)
router.get('/availability/:userId', [
  param('userId').isMongoId().withMessage('Invalid user ID'),
  query('dateFrom').isISO8601().withMessage('Valid start date is required'),
  query('dateTo').isISO8601().withMessage('Valid end date is required')
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Get interviewer availability endpoint - to be implemented' });
});

// @route   POST /api/v1/interviews/bulk-schedule
// @desc    Bulk schedule multiple interviews
// @access  Private (Recruiter/Admin)
router.post('/bulk-schedule', [
  body('interviews').isArray({ min: 1 }).withMessage('Interviews array is required'),
  body('interviews.*.applicationId').isMongoId(),
  body('interviews.*.scheduledDate').isISO8601(),
  body('interviews.*.interviewerIds').isArray({ min: 1 })
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Bulk schedule interviews endpoint - to be implemented' });
});

// @route   GET /api/v1/interviews/analytics
// @desc    Get interview analytics and statistics
// @access  Private (Recruiter/Admin)
router.get('/analytics', [
  query('dateFrom').optional().isISO8601(),
  query('dateTo').optional().isISO8601(),
  query('jobId').optional().isMongoId(),
  query('interviewerId').optional().isMongoId()
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Get interview analytics endpoint - to be implemented' });
});

export default router;
