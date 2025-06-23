import { useState } from 'react';
 
const Messages = () => {
  const [selectedCandidate, setSelectedCandidate] = useState('1');
  const [messageText, setMessageText] = useState('');
  
  const candidates = [
    {
      id: '1',
      name: 'Sarah Johnson',
      position: 'Senior UI/UX Designer',
      initials: 'SJ',
      status: 'new',
      lastMessage: 'Thanks for considering my application',
      unread: true,
      time: '10:23 AM'
    },
    {
      id: '2',
      name: 'Michael Chen',
      position: 'Full Stack Developer',
      initials: 'MC',
      status: 'interviewing',
      lastMessage: 'Looking forward to the technical interview',
      unread: false,
      time: 'Yesterday'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      position: 'Product Manager',
      initials: 'ER',
      status: 'offer',
      lastMessage: 'I received the offer letter',
      unread: false,
      time: 'Sep 10'
    }
  ];
 
  const messages = [
    {
      id: '1',
      candidateId: '1',
      sender: 'candidate',
      message: 'Hi! I am very interested in the Senior UI/UX Designer position.',
      time: '10:00 AM'
    },
    {
      id: '2',
      candidateId: '1',
      sender: 'recruiter',
      message: 'Thank you for your interest! I have reviewed your portfolio.',
      time: '10:15 AM'
    },
    {
      id: '3',
      candidateId: '1',
      sender: 'candidate',
      message: 'Thanks for considering my application. I am available for a call this week.',
      time: '10:23 AM'
    }
  ];
 
  const getStatusColor = (status) => {
    if (status === 'new') return 'bg-blue-100 text-blue-800';
    if (status === 'interviewing') return 'bg-yellow-100 text-yellow-800';
    if (status === 'offer') return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };
 
  const selectedCandidateData = candidates.find(c => c.id === selectedCandidate);
  const candidateMessages = messages.filter(m => m.candidateId === selectedCandidate);
 
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    console.log('Sending message:', messageText);
    setMessageText('');
  };
 
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-gray-600">Communicate with candidates throughout the hiring process</p>
      </div>
 
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Candidates List */}
        <div className="border rounded-lg p-4">
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-8 p-2 border rounded-lg"
              />
            </div>
            
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {candidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className={'p-3 rounded-lg cursor-pointer transition-colors ' + (selectedCandidate === candidate.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50')}
                  onClick={() => setSelectedCandidate(candidate.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="font-medium text-blue-600">{candidate.initials}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">{candidate.name}</p>
                        <span className="text-xs text-gray-500">{candidate.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{candidate.position}</p>
                      <p className="text-sm text-gray-500 truncate mt-1">{candidate.lastMessage}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className={'px-2 py-1 rounded-full text-xs font-medium ' + getStatusColor(candidate.status)}>
                          {candidate.status}
                        </span>
                        {candidate.unread && (
                          <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
 
        {/* Messages Area */}
        <div className="lg:col-span-2 border rounded-lg flex flex-col">
          {selectedCandidateData ? (
            <>
              {/* Header */}
              <div className="p-4 border-b">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="font-medium text-blue-600">{selectedCandidateData.initials}</span>
                  </div>
                  <div>
                    <h3 className="font-medium">{selectedCandidateData.name}</h3>
                    <p className="text-sm text-gray-600">{selectedCandidateData.position}</p>
                  </div>
                  <span className={'px-2 py-1 rounded-full text-xs font-medium ' + getStatusColor(selectedCandidateData.status)}>
                    {selectedCandidateData.status}
                  </span>
                </div>
              </div>
 
              {/* Messages */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {candidateMessages.map((message) => (
                  <div
                    key={message.id}
                    className={'flex ' + (message.sender === 'recruiter' ? 'justify-end' : 'justify-start')}
                  >
                    <div
                      className={'max-w-[70%] p-3 rounded-lg ' + (message.sender === 'recruiter' ? 'bg-blue-600 text-white' : 'bg-gray-100')}
                    >
                      <p className="text-sm">{message.message}</p>
                      <p className={'text-xs mt-1 ' + (message.sender === 'recruiter' ? 'text-blue-100' : 'text-gray-500')}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
 
              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <textarea
                    placeholder="Type your message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="flex-1 p-3 border rounded-lg resize-none"
                    rows="2"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 self-end"
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <h3 className="text-lg font-medium">No conversation selected</h3>
                <p>Choose a candidate from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default Messages;
