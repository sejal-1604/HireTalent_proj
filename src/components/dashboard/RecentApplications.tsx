
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type Application = {
  id: string;
  candidate: {
    name: string;
    avatar?: string;
    initials: string;
  };
  position: string;
  date: string;
  status: 'new' | 'reviewing' | 'interviewing' | 'offer' | 'rejected';
};

const StatusBadge = ({ status }: { status: Application['status'] }) => {
  const statusConfig = {
    new: { label: 'New', variant: 'default' },
    reviewing: { label: 'Reviewing', variant: 'secondary' },
    interviewing: { label: 'Interviewing', variant: 'warning' },
    offer: { label: 'Offer', variant: 'success' },
    rejected: { label: 'Rejected', variant: 'destructive' },
  };

  const config = statusConfig[status] || statusConfig.new;
  
  return (
    <Badge variant={config.variant as any}>
      {config.label}
    </Badge>
  );
};

type RecentApplicationsProps = {
  applications: Application[];
};

export function RecentApplications({ applications }: RecentApplicationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={app.candidate.avatar} />
                  <AvatarFallback>{app.candidate.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{app.candidate.name}</p>
                  <p className="text-sm text-muted-foreground">{app.position}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={app.status} />
                <p className="text-sm text-muted-foreground">{app.date}</p>
              </div>
            </div>
          ))}
          
          <Button variant="outline" className="w-full mt-2">
            View All Applications
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
