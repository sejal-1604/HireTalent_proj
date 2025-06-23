import { apiClient } from './api.js';
// Applications service
export const applicationsService = {
  // Submit job application
  submitApplication: async (applicationData) => {
    try {
      const response = await apiClient.post('/applications', applicationData);
      return response;
    } catch (error) {
      console.error('Submit application service error:', error);
      throw error;
    }
  },
  // Get all applications (for recruiters)
  getAllApplications: async () => {
    try {
      const response = await apiClient.get('/applications');
      return response;
    } catch (error) {
      console.error('Get all applications service error:', error);
      throw error;
    }
  },
  // Get user's applications (for candidates)
  getMyApplications: async () => {
    try {
      const response = await apiClient.get('/applications/my-applications');
      return response;
    } catch (error) {
      console.error('Get my applications service error:', error);
      throw error;
    }
  },
  // Get single application by ID
  getApplicationById: async (applicationId) => {
    try {
      const response = await apiClient.get(`/applications/${applicationId}`);
      return response;
    } catch (error) {
      console.error('Get application by ID service error:', error);
      throw error;
    }
  },
  // Update application status (for recruiters)
  updateApplicationStatus: async (applicationId, status) => {
    try {
      const response = await apiClient.patch(`/applications/${applicationId}/status`, {
        status,
      });
      return response;
    } catch (error) {
      console.error('Update application status service error:', error);
      throw error;
    }
  },
  // Download applicant's resume
  downloadResume: async (applicationId) => {
    try {
      const response = await apiClient.get(`/applications/${applicationId}/resume`);
      return response;
    } catch (error) {
      console.error('Download resume service error:', error);
      throw error;
    }
  },
  // Get applications for a specific job (for recruiters)
  getJobApplications: async (jobId) => {
    try {
      const response = await apiClient.get(`/applications?jobId=${jobId}`);
      return response;
    } catch (error) {
      console.error('Get job applications service error:', error);
      throw error;
    }
  },
  // Get application statistics (for dashboard)
  getApplicationStats: async () => {
    try {
      const response = await apiClient.get('/applications/stats');
      return response;
    } catch (error) {
      console.error('Get application stats service error:', error);
      throw error;
    }
  },
};
