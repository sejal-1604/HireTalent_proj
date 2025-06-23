import { useState } from 'react';
 
const Interviews = () => {
  const [showScheduler, setShowScheduler] = useState(false);
  const [interviews] = useState([
    {
      id: "1",
      candidate: { name: "Emily Rodriguez", email: "emily.r@example.com", initials: "ER" },
      position: "Product Manager",
      date: "Tomorrow",
      time: "10:00 AM - 11:00 AM",
      interviewer: "John Smith",
      type: "Technical Interview",
      status: "scheduled",
    },
    {
      id: "2",
      candidate: { name: "Alex Turner", email: "alex.t@example.com", initials: "AT" },
      position: "Backend Engineer",
      date: "Sep 15, 2023",
      time: "2:00 PM - 3:00 PM",
      interviewer: "Jane Doe",
      type: "Initial Screening",
      status: "completed",
    }
  ]);
 
  const getStatusColor = (status) => {
    if (status === 'scheduled') return 'bg-blue-100 text-blue-800';
    if (status === 'completed') return 'bg-green-100 text-green-800';
    if (status === 'cancelled') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };
 
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Interviews</h1>
          <p className="text-gray-600">Schedule and manage candidate interviews</p>
        </div>
        <button
          onClick={() => setShowScheduler(!showScheduler)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {showScheduler ? 'Hide Scheduler' : 'Schedule Interview'}
        </button>
      </div>
 
      {showScheduler && (
        <div className="border rounded-lg p-6 bg-gray-50 mb-6">
          <h2 className="text-xl font-semibold mb-4">Schedule New Interview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Candidate Name" className="p-3 border rounded-lg" />
            <input type="text" placeholder="Position" className="p-3 border rounded-lg" />
            <input type="date" className="p-3 border rounded-lg" />
            <input type="time" className="p-3 border rounded-lg" />
          </div>
          <div className="flex gap-2 mt-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Schedule
            </button>
            <button 
              onClick={() => setShowScheduler(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
 
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-medium">Candidate</th>
              <th className="text-left p-4 font-medium">Position</th>
              <th className="text-left p-4 font-medium">Date & Time</th>
              <th className="text-left p-4 font-medium">Interviewer</th>
              <th className="text-left p-4 font-medium">Type</th>
              <th className="text-left p-4 font-medium">Status</th>
              <th className="text-left p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map((interview) => (
              <tr key={interview.id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="font-medium text-blue-600">
                        {interview.candidate.initials}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{interview.candidate.name}</div>
                      <div className="text-sm text-gray-600">{interview.candidate.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">{interview.position}</td>
                <td className="p-4">
                  <div className="font-medium">{interview.date}</div>
                  <div className="text-sm text-gray-600">{interview.time}</div>
                </td>
                <td className="p-4">{interview.interviewer}</td>
                <td className="p-4">{interview.type}</td>
                <td className="p-4">
                  <span className={'px-2 py-1 rounded-full text-xs font-medium ' + getStatusColor(interview.status)}>
                    {interview.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    {interview.status === 'scheduled' && (
                      <>
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          Join Meeting
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 text-sm">
                          Reschedule
                        </button>
                      </>
                    )}
                    {interview.status === 'completed' && (
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        View Notes
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 
      {interviews.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No interviews scheduled yet.</p>
        </div>
      )}
    </div>
  );
};
 
export default Interviews;
