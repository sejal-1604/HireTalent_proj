import { useState } from 'react';
import { SchedulerWidget } from '@/components/interviews/SchedulerWidget';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Calendar, Clock } from 'lucide-react';

const Interviews = () => {
  // Mock interview data
  const interviews = [
    {
      id: "1",
      candidate: {
        name: "Emily Rodriguez",
        email: "emily.r@example.com",
        avatar: "",
        initials: "ER",
      },
      position: "Product Manager",
      date: "Tomorrow",
      time: "10:00 AM - 11:00 AM",
      interviewer: "John Smith",
      type: "Technical Interview",
      status: "scheduled",
    },
    {
      id: "2",
      candidate: {
        name: "Alex Turner",
        email: "alex.t@example.com",
        avatar: "",
        initials: "AT",
      },
      position: "Backend Engineer",
      date: "Sep 15, 2023",
      time: "2:00 PM - 3:00 PM",
      interviewer: "Jane Doe",
      type: "Initial Screening",
      status: "scheduled",
    },
    {
      id: "3",
      candidate: {
        name: "Michael Chen",
        email: "michael.c@example.com",
        avatar: "",
        initials: "MC",
      },
      position: "Full Stack Developer",
      date: "Sep 10, 2023",
      time: "11:30 AM - 12:30 PM",
      interviewer: "Robert Johnson",
      type: "Final Round",
      status: "completed",
    },
    {
      id: "4",
      candidate: {
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        avatar: "",
        initials: "SJ",
      },
      position: "Senior UI/UX Designer",
      date: "Sep 5, 2023",
      time: "3:00 PM - 4:00 PM",
      interviewer: "Maria Garcia",
      type: "Culture Fit",
      status: "canceled",
    },
  ];

  const [showScheduler, setShowScheduler] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Interviews</h1>
        <Button onClick={() => setShowScheduler(!showScheduler)}>
          {showScheduler ? "Close" : "Schedule Interview"}
        </Button>
      </div>

      {showScheduler && (
        <div className="mb-8">
          <SchedulerWidget />
        </div>
      )}

      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold text-lg">Interview Schedule</h2>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search interviews..." 
              className="pl-8 w-[250px]"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {interviews.map((interview) => (
              <TableRow key={interview.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={interview.candidate.avatar} />
                      <AvatarFallback>{interview.candidate.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{interview.candidate.name}</div>
                      <div className="text-sm text-muted-foreground">{interview.candidate.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{interview.position}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>{interview.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock size={14} />
                      <span>{interview.time}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{interview.type}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      interview.status === "scheduled" ? "default" : 
                      interview.status === "completed" ? "secondary" : "destructive"
                    }
                  >
                    {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Interviews;
