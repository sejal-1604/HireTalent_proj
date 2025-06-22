
import { useState } from 'react';
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
import { Search } from 'lucide-react';

const Jobs = () => {
  // Mock job data
  const jobs = [
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
    {
      id: "4",
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      posted: "3 weeks ago",
      status: "closed",
      applicants: 32,
    },
    {
      id: "5",
      title: "Customer Support Representative",
      department: "Support",
      location: "Remote",
      posted: "1 month ago",
      status: "draft",
      applicants: 0,
    },
  ];

  const [showJobGenerator, setShowJobGenerator] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Jobs</h1>
        <Button onClick={() => setShowJobGenerator(!showJobGenerator)}>
          {showJobGenerator ? "Close" : "Create Job"}
        </Button>
      </div>

      {showJobGenerator && (
        <div className="mb-8">
          <JobGenerator />
        </div>
      )}

      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold text-lg">Job Listings</h2>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search jobs..." 
              className="pl-8 w-[250px]"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Posted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Applicants</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell>{job.department}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.posted}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      job.status === "active" ? "default" : 
                      job.status === "draft" ? "outline" : "secondary"
                    }
                  >
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{job.applicants}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Jobs;
