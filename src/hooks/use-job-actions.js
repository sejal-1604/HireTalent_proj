import { useState } from 'react';
import { useAuth } from '@/Context/AuthContext';
import { createJob } from '@/lib/firestore';
import { toast } from 'sonner';

export const useJobActions = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { currentUser } = useAuth();

  const generateJobDescription = async (
    jobTitle,
    jobType,
    jobLocation,
    keywords
  ) => {
    if (!jobTitle) {
      toast.error("Please provide at least a job title");
      return null;
    }

    try {
      // This is a simulated response since we don't have actual AI integration yet
      const dummyResponse = `
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

      toast.success("Description generated successfully");
      return dummyResponse;
    } catch (error) {
      toast.error("Failed to generate job description");
      return null;
    }
  };

  const saveJob = async (jobData) => {
    if (!currentUser) {
      toast.error("You must be logged in to save a job");
      return null;
    }

    setIsCreating(true);
    try {
      const job = await createJob(currentUser.uid, jobData);
      setIsCreating(false);
      return job;
    } catch (error) {
      setIsCreating(false);
      return null;
    }
  };

  const publishJob = async (jobData) => {
    if (!currentUser) {
      toast.error("You must be logged in to publish a job");
      return null;
    }

    setIsCreating(true);
    try {
      const job = await createJob(currentUser.uid, {
        ...jobData,
        status: "published"
      });
      setIsCreating(false);
      return job;
    } catch (error) {
      setIsCreating(false);
      return null;
    }
  };

  return {
    isCreating,
    generateJobDescription,
    saveJob,
    publishJob
  };
};

