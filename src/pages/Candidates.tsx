
import { useState } from 'react';
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
import { Search, CheckCheck } from 'lucide-react';

const Candidates = () => {
  // Mock candidate data
  const candidates = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      position: "Senior UI/UX Designer",
      status: "new",
      applied: "2 days ago",
      avatar: "",
      initials: "SJ",
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael.c@example.com",
      position: "Full Stack Developer",
      status: "interviewing",
      applied: "1 week ago",
      avatar: "",
      initials: "MC",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      email: "emily.r@example.com",
      position: "Product Manager",
      status: "offer",
      applied: "2 weeks ago",
      avatar: "",
      initials: "ER",
    },
    {
      id: "4",
      name: "David Thompson",
      email: "david.t@example.com",
      position: "Marketing Specialist",
      status: "hired",
      applied: "1 month ago",
      avatar: "",
      initials: "DT",
    },
    {
      id: "5",
      name: "Alex Turner",
      email: "alex.t@example.com",
      position: "Backend Engineer",
      status: "rejected",
      applied: "2 months ago",
      avatar: "",
      initials: "AT",
    },
  ];

  const [showResumeUpload, setShowResumeUpload] = useState(false);

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string, variant: string }> = {
      new: { label: 'New', variant: 'default' },
      reviewing: { label: 'Reviewing', variant: 'secondary' },
      interviewing: { label: 'Interviewing', variant: 'warning' },
      offer: { label: 'Offer', variant: 'success' },
      hired: { label: 'Hired', variant: 'success' },
      rejected: { label: 'Rejected', variant: 'destructive' },
    };

    const config = statusConfig[status] || statusConfig.new;
    
    return (
      <Badge variant={config.variant as any}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Candidates</h1>
        <Button onClick={() => setShowResumeUpload(!showResumeUpload)}>
          {showResumeUpload ? "Close" : "Upload Resume"}
        </Button>
      </div>

      {showResumeUpload && (
        <div className="mb-8">
          <ResumeUpload />
        </div>
      )}

      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold text-lg">Candidate Pool</h2>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search candidates..." 
              className="pl-8 w-[250px]"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Applied</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
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
                <TableCell>{getStatusBadge(candidate.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">Actions</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                      <DropdownMenuItem>Send Message</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Reject Candidate
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Candidates;
