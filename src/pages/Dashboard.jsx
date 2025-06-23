import { useState, useEffect } from 'react';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentApplications } from '@/components/dashboard/RecentApplications';
import { UpcomingInterviews } from '@/components/dashboard/UpcomingInterviews';
import { User, File, Calendar, CheckCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { jobsService } from '../services/jobs';
import { applicationsService } from '../services/applications';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState([
    {
      title: "Open Positions",
      value: 0,
      icon: <File size={18} />,
      trend: { value: 0, isPositive: true },
    },
    {
      title: "New Applications",
      value: 0,
      icon: <User size={18} />,
      trend: { value: 0, isPositive: true },
    },
    {
      title: "Scheduled Interviews",
      value: 0,
      icon: <Calendar size={18} />,
      trend: { value: 0, isPositive: true },
    },
    {
      title: "Hired This Month",
      value: 0,
      icon: <CheckCheck size={18} />,
      trend: { value: 0, isPositive: true },
    },
  ]);

  const [recentApplications, setRecentApplications] = useState([]);
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        if (user?.role === 'recruiter') {
          const [jobsResponse, applicationsResponse] = await Promise.all([
            jobsService.getMyJobs(),
            applicationsService.getAllApplications()
          ]);

          if (jobsResponse.success) {
            setStats(prevStats => [
              { ...prevStats[0], value: jobsResponse.jobs?.length || 0 },
              { ...prevStats[1], value: applicationsResponse.applications?.length || 0 },
              { ...prevStats[2], value: 0 },
              { ...prevStats[3], value: 0 },
            ]);
          }

          if (applicationsResponse.success) {
            setRecentApplications(applicationsResponse.applications?.slice(0, 5) || []);
          }
        } else {
          const applicationsResponse = await applicationsService.getMyApplications();

          if (applicationsResponse.success) {
            const applications = applicationsResponse.applications || [];
            setStats(prevStats => [
              { ...prevStats[0], value: 0 },
              { ...prevStats[1], value: applications.length },
              { ...prevStats[2], value: applications.filter(app => app.status === 'interview').length },
              { ...prevStats[3], value: applications.filter(app => app.status === 'hired').length },
            ]);
            setRecentApplications(applications.slice(0, 5));
          }
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setStats([
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
        ]);
        setRecentApplications([
          {
            id: "1",
            candidate: {
              name: "Sarah Johnson",
              initials: "SJ",
            },
            position: "Senior UI/UX Designer",
            date: "Today",
            status: "new",
          },
          {
            id: "2",
            candidate: {
              name: "Michael Chen",
              initials: "MC",
            },
            position: "Frontend Developer",
            date: "Yesterday",
            status: "reviewing",
          },
          {
            id: "3",
            candidate: {
              name: "Emily Davis",
              initials: "ED",
            },
            position: "Product Manager",
            date: "2 days ago",
            status: "interview",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, {user?.name || 'User'}!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your {user?.role === 'recruiter' ? 'hiring' : 'job search'} today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <RecentApplications applications={recentApplications} />
        <UpcomingInterviews interviews={upcomingInterviews} />
      </div>
    </div>
  );
};

export default Dashboard;
