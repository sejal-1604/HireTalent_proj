import express from 'express';
import { body, query, param } from 'express-validator';

const router = express.Router();

// Validation middleware
const createApplicationValidation = [
  body('jobId').isMongoId().withMessage('Valid job ID is required'),
  body('firstName').trim().isLength({ min: 1 }).withMessage('First name is required'),
  body('lastName').trim().isLength({ min: 1 }).withMessage('Last name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').trim().isLength({ min: 10 }).withMessage('Valid phone number is required'),
  body('experience').optional().isNumeric().withMessage('Experience must be a number'),
  body('currentCompany').optional().trim(),
  body('currentPosition').optional().trim(),
  body('expectedSalary').optional().isNumeric().withMessage('Expected salary must be a number'),
  body('noticePeriod').optional().isIn(['immediate', '15-days', '1-month', '2-months', '3-months']),
  body('coverLetter').optional().trim(),
  body('linkedinProfile').optional().isURL().withMessage('LinkedIn profile must be a valid URL'),
  body('portfolioUrl').optional().isURL().withMessage('Portfolio URL must be valid'),
  body('skills').optional().isArray().withMessage('Skills must be an array')
];

const updateApplicationValidation = [
  body('status').optional().isIn(['new', 'reviewed', 'interviewed', 'selected', 'rejected', 'withdrawn']),
  body('notes').optional().trim(),
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('interviewFeedback').optional().trim(),
  body('rejectionReason').optional().trim()
];

const applicationQueryValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status').optional().isIn(['new', 'reviewed', 'interviewed', 'selected', 'rejected', 'withdrawn']),
  query('jobId').optional().isMongoId().withMessage('Invalid job ID'),
  query('search').optional().trim(),
  query('sortBy').optional().isIn(['createdAt', 'updatedAt', 'firstName', 'lastName', 'rating']),
  query('sortOrder').optional().isIn(['asc', 'desc']),
  query('dateFrom').optional().isISO8601().withMessage('Invalid date format'),
  query('dateTo').optional().isISO8601().withMessage('Invalid date format')
];

const bulkUpdateValidation = [
  body('applicationIds').isArray({ min: 1 }).withMessage('Application IDs array is required'),
  body('applicationIds.*').isMongoId().withMessage('Invalid application ID'),
  body('status').isIn(['new', 'reviewed', 'interviewed', 'selected', 'rejected', 'withdrawn']),
  body('notes').optional().trim()
];

// @route   GET /api/v1/applications
// @desc    Get all applications with filtering and pagination
// @access  Private (Recruiter/Admin)
router.get('/', applicationQueryValidation, async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Get all applications endpoint - to be implemented' });
});

// @route   GET /api/v1/applications/:id
// @desc    Get single application by ID
// @access  Private (Recruiter/Admin)
router.get('/:id', [
  param('id').isMongoId().withMessage('Invalid application ID')
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Get single application endpoint - to be implemented' });
});

// @route   POST /api/v1/applications
// @desc    Create a new job application
// @access  Public
router.post('/', createApplicationValidation, async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Create application endpoint - to be implemented' });
});

// @route   PUT /api/v1/applications/:id
// @desc    Update application by ID
// @access  Private (Recruiter/Admin)
router.put('/:id', [
  param('id').isMongoId().withMessage('Invalid application ID'),
  ...updateApplicationValidation
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Update application endpoint - to be implemented' });
});

// @route   DELETE /api/v1/applications/:id
// @desc    Delete application by ID
// @access  Private (Admin)
router.delete('/:id', [
  param('id').isMongoId().withMessage('Invalid application ID')
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Delete application endpoint - to be implemented' });
});

// @route   POST /api/v1/applications/:id/upload-resume
// @desc    Upload resume for application
// @access  Public/Private
router.post('/:id/upload-resume', [
  param('id').isMongoId().withMessage('Invalid application ID')
], async (req, res) => {
  // Controller logic will be implemented later
  // Multer middleware will handle file upload
  res.json({ message: 'Upload resume endpoint - to be implemented' });
});

// @route   GET /api/v1/applications/:id/resume
// @desc    Download/view resume for application
// @access  Private (Recruiter/Admin)
router.get('/:id/resume', [
  param('id').isMongoId().withMessage('Invalid application ID')
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Get resume endpoint - to be implemented' });
});

// @route   PUT /api/v1/applications/:id/status
// @desc    Update application status
// @access  Private (Recruiter/Admin)
router.put('/:id/status', [
  param('id').isMongoId().withMessage('Invalid application ID'),
  body('status').isIn(['new', 'reviewed', 'interviewed', 'selected', 'rejected', 'withdrawn']),
  body('notes').optional().trim(),
  body('rejectionReason').optional().trim()
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Update application status endpoint - to be implemented' });
});

// @route   POST /api/v1/applications/:id/schedule-interview
// @desc    Schedule interview for application
// @access  Private (Recruiter/Admin)
router.post('/:id/schedule-interview', [
  param('id').isMongoId().withMessage('Invalid application ID'),
  body('interviewDate').isISO8601().withMessage('Valid interview date is required'),
  body('interviewType').isIn(['phone', 'video', 'in-person']).withMessage('Invalid interview type'),
  body('duration').isInt({ min: 15, max: 480 }).withMessage('Duration must be between 15 and 480 minutes'),
  body('interviewerIds').isArray().withMessage('Interviewer IDs must be an array'),
  body('interviewerIds.*').isMongoId().withMessage('Invalid interviewer ID'),
  body('notes').optional().trim(),
  body('meetingLink').optional().isURL().withMessage('Meeting link must be a valid URL')
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Schedule interview endpoint - to be implemented' });
});

// @route   POST /api/v1/applications/:id/send-email
// @desc    Send email to applicant
// @access  Private (Recruiter/Admin)
router.post('/:id/send-email', [
  param('id').isMongoId().withMessage('Invalid application ID'),
  body('subject').trim().isLength({ min: 1 }).withMessage('Email subject is required'),
  body('message').trim().isLength({ min: 1 }).withMessage('Email message is required'),
  body('template').optional().isIn(['interview-invitation', 'rejection', 'offer', 'follow-up']),
  body('attachments').optional().isArray().withMessage('Attachments must be an array')
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Send email endpoint - to be implemented' });
});

// @route   PUT /api/v1/applications/bulk-update
// @desc    Bulk update multiple applications
// @access  Private (Recruiter/Admin)
router.put('/bulk-update', bulkUpdateValidation, async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Bulk update applications endpoint - to be implemented' });
});

// @route   GET /api/v1/applications/:id/timeline
// @desc    Get application timeline/history
// @access  Private (Recruiter/Admin)
router.get('/:id/timeline', [
  param('id').isMongoId().withMessage('Invalid application ID')
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Get application timeline endpoint - to be implemented' });
});

// @route   POST /api/v1/applications/:id/add-note
// @desc    Add note to application
// @access  Private (Recruiter/Admin)
router.post('/:id/add-note', [
  param('id').isMongoId().withMessage('Invalid application ID'),
  body('note').trim().isLength({ min: 1 }).withMessage('Note content is required'),
  body('isPrivate').optional().isBoolean().withMessage('isPrivate must be a boolean')
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Add note to application endpoint - to be implemented' });
});

// @route   GET /api/v1/applications/export
// @desc    Export applications data
// @access  Private (Recruiter/Admin)
router.get('/export', [
  query('format').optional().isIn(['csv', 'excel', 'pdf']).withMessage('Invalid export format'),
  query('jobId').optional().isMongoId().withMessage('Invalid job ID'),
  query('status').optional().isIn(['new', 'reviewed', 'interviewed', 'selected', 'rejected', 'withdrawn']),
  query('dateFrom').optional().isISO8601().withMessage('Invalid date format'),
  query('dateTo').optional().isISO8601().withMessage('Invalid date format')
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Export applications endpoint - to be implemented' });
});

export default router;
