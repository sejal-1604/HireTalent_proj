import { apiClient } from './api.js';
// Jobs service
export const jobsService = {
  // Get all jobs
  getAllJobs: async () => {
    try {
      const response = await apiClient.get('/jobs');
      return response;
    } catch (error) {
      console.error('Get all jobs service error:', error);
      throw error;
    }
  },
  // Get single job by ID
  getJobById: async (jobId) => {
    try {
      const response = await apiClient.get(`/jobs/${jobId}`);
      return response;
    } catch (error) {
      console.error('Get job by ID service error:', error);
      throw error;
    }
  },
  // Create new job (for recruiters)
  createJob: async (jobData) => {
    try {
      const response = await apiClient.post('/jobs', jobData);
      return response;
    } catch (error) {
      console.error('Create job service error:', error);
      throw error;
    }
  },
  // Update job (for recruiters)
  updateJob: async (jobId, jobData) => {
    try {
      const response = await apiClient.put(`/jobs/${jobId}`, jobData);
      return response;
    } catch (error) {
      console.error('Update job service error:', error);
      throw error;
    }
  },
  // Delete job (for recruiters)
  deleteJob: async (jobId) => {
    try {
      const response = await apiClient.delete(`/jobs/${jobId}`);
      return response;
    } catch (error) {
      console.error('Delete job service error:', error);
      throw error;
    }
  },
  // Get jobs created by current user (for recruiters)
  getMyJobs: async () => {
    try {
      const response = await apiClient.get('/jobs/my-jobs');
      return response;
    } catch (error) {
      console.error('Get my jobs service error:', error);
      throw error;
    }
  },
  // Search jobs with filters
  searchJobs: async (searchParams) => {
    try {
      const queryString = new URLSearchParams(searchParams).toString();
      const response = await apiClient.get(`/jobs?${queryString}`);
      return response;
    } catch (error) {
      console.error('Search jobs service error:', error);
      throw error;
    }
  },
};
