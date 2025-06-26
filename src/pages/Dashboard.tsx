
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentApplications } from '@/components/dashboard/RecentApplications';
import { UpcomingInterviews } from '@/components/dashboard/UpcomingInterviews';
import { User, File, Calendar, CheckCheck } from 'lucide-react';

const Dashboard = () => {
  // Mock data for demonstration
  const stats = [
    {
      title: "Open Positions",
      value: 8,
      icon: <File size={18} />,
      trend: { value: 12, isPositive: true },
    },
    {
      title: "New Applications",
      value: 24,
      icon: <User size={18} />,
      trend: { value: 8, isPositive: true },
    },
    {
      title: "Scheduled Interviews",
      value: 12,
      icon: <Calendar size={18} />,
      trend: { value: 5, isPositive: true },
    },
    {
      title: "Hired This Month",
      value: 3,
      icon: <CheckCheck size={18} />,
      trend: { value: 0, isPositive: true },
    },
  ];

  const recentApplications = [
    {
      id: "1",
      candidate: {
        name: "Sarah Johnson",
        initials: "SJ",
      },
      position: "Senior UI/UX Designer",
      date: "Today",
      status: "new" as const,
    },
    {
      id: "2",
      candidate: {
        name: "Michael Chen",
        initials: "MC",
      },
      position: "Full Stack Developer",
      date: "Yesterday",
      status: "reviewing" as const,
    },
    {
      id: "3",
      candidate: {
        name: "Emily Rodriguez",
        initials: "ER",
      },
      position: "Product Manager",
      date: "3 days ago",
      status: "interviewing" as const,
    },
    {
      id: "4",
      candidate: {
        name: "David Thompson",
        initials: "DT",
      },
      position: "Marketing Specialist",
      date: "1 week ago",
      status: "offer" as const,
    },
  ];

  const upcomingInterviews = [
    {
      id: "1",
      candidate: {
        name: "Emily Rodriguez",
        initials: "ER",
      },
      position: "Product Manager",
      date: "Tomorrow",
      time: "10:00 AM - 11:00 AM",
      interviewer: "John Smith",
    },
    {
      id: "2",
      candidate: {
        name: "Alex Turner",
        initials: "AT",
      },
      position: "Backend Engineer",
      date: "Sep 15, 2023",
      time: "2:00 PM - 3:00 PM",
      interviewer: "Jane Doe",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentApplications applications={recentApplications} />
        <UpcomingInterviews interviews={upcomingInterviews} />
      </div>
    </div>
  );
};

export default Dashboard;
