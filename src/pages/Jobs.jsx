import { useState, useEffect } from 'react';
import { JobGenerator } from '@/components/jobs/JobGenerator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';
import { jobsService } from '../services/jobs';
import { applicationsService } from '../services/applications';
import { useToast } from '@/hooks/use-toast';

const Jobs = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showJobGenerator, setShowJobGenerator] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, [user]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      let response;
      if (user?.role === 'recruiter') {
        response = await jobsService.getMyJobs();
      } else {
        response = await jobsService.getAllJobs();
      }
      if (response.success) {
        setJobs(response.jobs || []);
      } else {
        throw new Error(response.message || 'Failed to fetch jobs');
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: "Error",
        description: "Failed to load jobs. Using sample data.",
        variant: "destructive",
      });
      setJobs([
        {
          id: "1",
          title: "Senior UI/UX Designer",
          department: "Design",
          location: "Remote",
          posted: "2 days ago",
          status: "active",
          applicants: 12,
        },
        {
          id: "2",
          title: "Full Stack Developer",
          department: "Engineering",
          location: "San Francisco, CA",
          posted: "1 week ago",
          status: "active",
          applicants: 24,
        },
        {
          id: "3",
          title: "Product Manager",
          department: "Product",
          location: "New York, NY",
          posted: "2 weeks ago",
          status: "active",
          applicants: 18,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyToJob = async (jobId) => {
    try {
      const response = await applicationsService.submitApplication({
        jobId: jobId,
        coverLetter: "I am interested in this position and believe I would be a great fit.",
      });
      if (response.success) {
        toast({
          title: "Application Submitted",
          description: "Your application has been submitted successfully!",
        });
      } else {
        throw new Error(response.message || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error applying to job:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit application",
        variant: "destructive",
      });
    }
  };

  const handleCreateJob = async (jobData) => {
    try {
      const response = await jobsService.createJob(jobData);
      if (response.success) {
        toast({
          title: "Job Created",
          description: "Job posting has been created successfully!",
        });
        setShowJobGenerator(false);
        fetchJobs();
      } else {
        throw new Error(response.message || 'Failed to create job');
      }
    } catch (error) {
      console.error('Error creating job:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create job",
        variant: "destructive",
      });
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            {user?.role === 'recruiter' ? 'Job Postings' : 'Available Jobs'}
          </h1>
          <p className="text-muted-foreground">
            {user?.role === 'recruiter' 
              ? 'Manage your job postings and track applications' 
              : 'Find your next opportunity'}
          </p>
        </div>
        {user?.role === 'recruiter' && (
          <Button onClick={() => setShowJobGenerator(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Job
          </Button>
        )}
      </div>

      {showJobGenerator && (
        <JobGenerator 
          onJobCreated={handleCreateJob}
          onClose={() => setShowJobGenerator(false)}
        />
      )}

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Position</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Posted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applicants</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell>{job.department}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.posted}</TableCell>
                <TableCell>
                  <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                    {job.status}
                  </Badge>
                </TableCell>
                <TableCell>{job.applicants}</TableCell>
                <TableCell>
                  {user?.role === 'candidate' ? (
                    <Button size="sm" onClick={() => handleApplyToJob(job.id)}>
                      Apply
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            {searchTerm ? 'No jobs found matching your search.' : 'No jobs available at the moment.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Jobs;
