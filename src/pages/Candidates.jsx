import { useState, useEffect } from 'react';
import { ResumeUpload } from '@/components/candidates/ResumeUpload';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, CheckCheck, MoreHorizontal } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';
import { applicationsService } from '../services/applications';
import { useToast } from '@/hooks/use-toast';

const Candidates = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCandidates();
  }, [user]);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const response = await applicationsService.getAllApplications();

      if (response.success) {
        const candidateData = response.applications?.map(app => ({
          id: app.id,
          name: app.candidateName || app.user?.name || 'Unknown',
          email: app.candidateEmail || app.user?.email || '',
          position: app.jobTitle || app.job?.title || 'Unknown Position',
          status: app.status || 'new',
          applied: app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'Unknown',
          avatar: '',
          initials: (app.candidateName || app.user?.name || 'U')
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase(),
          applicationId: app.id,
        })) || [];

        setCandidates(candidateData);
      } else {
        throw new Error(response.message || 'Failed to fetch candidates');
      }
    } catch (error) {
      console.error('Error fetching candidates:', error);
      toast({
        title: 'Error',
        description: 'Failed to load candidates. Using sample data.',
        variant: 'destructive',
      });
      setCandidates([
        {
          id: '1',
          name: 'Sarah Johnson',
          email: 'sarah.j@example.com',
          position: 'Senior UI/UX Designer',
          status: 'new',
          applied: '2 days ago',
          avatar: '',
          initials: 'SJ',
        },
        {
          id: '2',
          name: 'Michael Chen',
          email: 'michael.c@example.com',
          position: 'Full Stack Developer',
          status: 'interviewing',
          applied: '1 week ago',
          avatar: '',
          initials: 'MC',
        },
        {
          id: '3',
          name: 'Emily Rodriguez',
          email: 'emily.r@example.com',
          position: 'Product Manager',
          status: 'hired',
          applied: '2 weeks ago',
          avatar: '',
          initials: 'ER',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (candidateId, newStatus) => {
    try {
      const candidate = candidates.find(c => c.id === candidateId);
      if (!candidate?.applicationId) {
        toast({
          title: 'Error',
          description: 'Cannot update status - application ID not found',
          variant: 'destructive',
        });
        return;
      }

      const response = await applicationsService.updateApplicationStatus(
        candidate.applicationId,
        newStatus
      );

      if (response.success) {
        setCandidates(prev =>
          prev.map(candidate =>
            candidate.id === candidateId ? { ...candidate, status: newStatus } : candidate
          )
        );
        toast({
          title: 'Status Updated',
          description: `Candidate status changed to ${newStatus}`,
        });
      } else {
        throw new Error(response.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update candidate status',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadgeVariant = status => {
    switch (status) {
      case 'new':
        return 'default';
      case 'reviewing':
        return 'secondary';
      case 'interviewing':
        return 'outline';
      case 'hired':
        return 'default';
      case 'rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-3xl font-bold">Candidates</h1>
          <p className="text-muted-foreground">
            Manage and review candidate applications
          </p>
        </div>
        {user?.role === 'candidate' && <ResumeUpload />}
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Applied</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCandidates.map(candidate => (
              <TableRow key={candidate.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={candidate.avatar} />
                      <AvatarFallback>{candidate.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{candidate.name}</div>
                      <div className="text-sm text-muted-foreground">{candidate.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{candidate.position}</TableCell>
                <TableCell>{candidate.applied}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(candidate.status)}>
                    {candidate.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {user?.role === 'recruiter' ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleStatusChange(candidate.id, 'reviewing')}>
                          Mark as Reviewing
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(candidate.id, 'interviewing')}>
                          Schedule Interview
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleStatusChange(candidate.id, 'hired')}>
                          <CheckCheck className="mr-2 h-4 w-4" />
                          Hire Candidate
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(candidate.id, 'rejected')}
                          className="text-red-600"
                        >
                          Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Button size="sm" variant="outline">
                      View Application
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredCandidates.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            {searchTerm
              ? 'No candidates found matching your search.'
              : 'No candidates available.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Candidates;
