import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar, Clock } from 'lucide-react';

export function UpcomingInterviews({ interviews = [] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Interviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {interviews.map((interview) => (
            <div key={interview.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={interview.candidate.avatar || ''}
                      alt={interview.candidate.name}
                    />
                    <AvatarFallback>
                      {interview.candidate.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{interview.candidate.name}</p>
                    <p className="text-sm text-muted-foreground">{interview.position}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>{interview.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{interview.time}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Interviewer: </span>
                  {interview.interviewer}
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Reschedule
                </Button>
                <Button size="sm" className="flex-1">
                  Join Meeting
                </Button>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full mt-2">
            View All Interviews
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
