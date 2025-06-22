import express from 'express';
import { body, query, param } from 'express-validator';

const router = express.Router();

// Validation middleware
const createJobValidation = [
  body('title').trim().isLength({ min: 1 }).withMessage('Job title is required'),
  body('department').trim().isLength({ min: 1 }).withMessage('Department is required'),
  body('location').trim().isLength({ min: 1 }).withMessage('Location is required'),
  body('jobType').isIn(['full-time', 'part-time', 'contract', 'internship']).withMessage('Invalid job type'),
  body('experienceLevel').isIn(['entry', 'mid', 'senior', 'executive']).withMessage('Invalid experience level'),
  body('salaryRange.min').optional().isNumeric().withMessage('Minimum salary must be a number'),
  body('salaryRange.max').optional().isNumeric().withMessage('Maximum salary must be a number'),
  body('description').optional().trim(),
  body('requirements').optional().isArray().withMessage('Requirements must be an array'),
  body('benefits').optional().isArray().withMessage('Benefits must be an array'),
  body('skills').optional().isArray().withMessage('Skills must be an array')
];

const updateJobValidation = [
  body('title').optional().trim().isLength({ min: 1 }),
  body('department').optional().trim().isLength({ min: 1 }),
  body('location').optional().trim().isLength({ min: 1 }),
  body('jobType').optional().isIn(['full-time', 'part-time', 'contract', 'internship']),
  body('experienceLevel').optional().isIn(['entry', 'mid', 'senior', 'executive']),
  body('salaryRange.min').optional().isNumeric(),
  body('salaryRange.max').optional().isNumeric(),
  body('status').optional().isIn(['draft', 'active', 'paused', 'closed'])
];

const jobQueryValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status').optional().isIn(['draft', 'active', 'paused', 'closed']),
  query('department').optional().trim(),
  query('jobType').optional().isIn(['full-time', 'part-time', 'contract', 'internship']),
  query('experienceLevel').optional().isIn(['entry', 'mid', 'senior', 'executive']),
  query('search').optional().trim()
];

const generateJobDescriptionValidation = [
  body('jobTitle').trim().isLength({ min: 1 }).withMessage('Job title is required'),
  body('department').trim().isLength({ min: 1 }).withMessage('Department is required'),
  body('experienceLevel').isIn(['entry', 'mid', 'senior', 'executive']).withMessage('Invalid experience level'),
  body('keySkills').optional().isArray().withMessage('Key skills must be an array'),
  body('companyInfo').optional().trim()
];

// @route   GET /api/v1/jobs
// @desc    Get all jobs with filtering and pagination
// @access  Private
router.get('/', jobQueryValidation, async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Get all jobs endpoint - to be implemented' });
});

// @route   GET /api/v1/jobs/:id
// @desc    Get single job by ID
// @access  Private
router.get('/:id', [
  param('id').isMongoId().withMessage('Invalid job ID')
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Get single job endpoint - to be implemented' });
});

// @route   POST /api/v1/jobs
// @desc    Create a new job
// @access  Private (Recruiter/Admin)
router.post('/', createJobValidation, async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Create job endpoint - to be implemented' });
});

// @route   PUT /api/v1/jobs/:id
// @desc    Update job by ID
// @access  Private (Recruiter/Admin)
router.put('/:id', [
  param('id').isMongoId().withMessage('Invalid job ID'),
  ...updateJobValidation
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Update job endpoint - to be implemented' });
});

// @route   DELETE /api/v1/jobs/:id
// @desc    Delete job by ID
// @access  Private (Admin)
router.delete('/:id', [
  param('id').isMongoId().withMessage('Invalid job ID')
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Delete job endpoint - to be implemented' });
});

// @route   POST /api/v1/jobs/generate-description
// @desc    Generate job description using AI
// @access  Private (Recruiter/Admin)
router.post('/generate-description', generateJobDescriptionValidation, async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Generate job description endpoint - to be implemented' });
});

// @route   POST /api/v1/jobs/:id/share
// @desc    Share job posting to external platforms
// @access  Private (Recruiter/Admin)
router.post('/:id/share', [
  param('id').isMongoId().withMessage('Invalid job ID'),
  body('platforms').isArray().withMessage('Platforms must be an array'),
  body('platforms.*').isIn(['linkedin', 'whatsapp', 'email']).withMessage('Invalid platform'),
  body('recipients').optional().isArray().withMessage('Recipients must be an array')
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Share job endpoint - to be implemented' });
});

// @route   GET /api/v1/jobs/:id/applications
// @desc    Get all applications for a specific job
// @access  Private (Recruiter/Admin)
router.get('/:id/applications', [
  param('id').isMongoId().withMessage('Invalid job ID'),
  query('status').optional().isIn(['new', 'reviewed', 'interviewed', 'selected', 'rejected', 'withdrawn']),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 })
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Get job applications endpoint - to be implemented' });
});

// @route   GET /api/v1/jobs/:id/analytics
// @desc    Get analytics for a specific job
// @access  Private (Recruiter/Admin)
router.get('/:id/analytics', [
  param('id').isMongoId().withMessage('Invalid job ID')
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Get job analytics endpoint - to be implemented' });
});

// @route   POST /api/v1/jobs/:id/duplicate
// @desc    Duplicate an existing job
// @access  Private (Recruiter/Admin)
router.post('/:id/duplicate', [
  param('id').isMongoId().withMessage('Invalid job ID')
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Duplicate job endpoint - to be implemented' });
});

// @route   PUT /api/v1/jobs/:id/status
// @desc    Update job status
// @access  Private (Recruiter/Admin)
router.put('/:id/status', [
  param('id').isMongoId().withMessage('Invalid job ID'),
  body('status').isIn(['draft', 'active', 'paused', 'closed']).withMessage('Invalid status')
], async (req, res) => {
  // Controller logic will be implemented later
  res.json({ message: 'Update job status endpoint - to be implemented' });
});

export default router;
