import express from 'express';

// Import all route modules
import authRoutes from './auth.js';
import jobRoutes from './jobs.js';
import applicationRoutes from './applications.js';
import interviewRoutes from './interviews.js';
import offerRoutes from './offers.js';
import dashboardRoutes from './dashboard.js';

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'HireTalent API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API documentation endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to HireTalent API',
    version: '1.0.0',
    description: 'AI-Powered Hiring Platform API',
    endpoints: {
      auth: '/api/v1/auth',
      jobs: '/api/v1/jobs',
      applications: '/api/v1/applications',
      interviews: '/api/v1/interviews',
      offers: '/api/v1/offers',
      dashboard: '/api/v1/dashboard'
    },
    documentation: '/api/v1/docs',
    health: '/api/v1/health'
  });
});

// Mount route modules
router.use('/auth', authRoutes);
router.use('/jobs', jobRoutes);
router.use('/applications', applicationRoutes);
router.use('/interviews', interviewRoutes);
router.use('/offers', offerRoutes);
router.use('/dashboard', dashboardRoutes);

// 404 handler for API routes
router.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.originalUrl} not found`,
    availableEndpoints: {
      auth: '/api/v1/auth',
      jobs: '/api/v1/jobs',
      applications: '/api/v1/applications',
      interviews: '/api/v1/interviews',
      offers: '/api/v1/offers',
      dashboard: '/api/v1/dashboard'
    }
  });
});

export default router;
