
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Mail, Search, Send, User } from 'lucide-react';

const Messages = () => {
  const { toast } = useToast();
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>("1");
  const [messageText, setMessageText] = useState("");

  // Mock candidates data
  const candidates = [
    {
      id: "1",
      name: "Sarah Johnson",
      position: "Senior UI/UX Designer",
      avatar: "",
      initials: "SJ",
      status: "new",
      lastMessage: "Thanks for considering my application",
      unread: true,
      time: "10:23 AM"
    },
    {
      id: "2",
      name: "Michael Chen",
      position: "Full Stack Developer",
      avatar: "",
      initials: "MC",
      status: "interviewing",
      lastMessage: "Looking forward to the technical interview",
      unread: false,
      time: "Yesterday"
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      position: "Product Manager",
      avatar: "",
      initials: "ER",
      status: "offer",
      lastMessage: "I've received the offer letter",
      unread: false,
      time: "Sep 10"
    },
  ];

  // Mock conversation data
  const conversations: Record<string, Array<{id: string, sender: string, text: string, time: string}>> = {
    "1": [
      {id: "1", sender: "candidate", text: "Hello, I just submitted my application for the Senior UI/UX Designer position.", time: "10:05 AM"},
      {id: "2", sender: "user", text: "Hi Sarah, thanks for your application! I've reviewed your portfolio and I'm impressed with your work.", time: "10:15 AM"},
      {id: "3", sender: "candidate", text: "Thanks for considering my application. I'm very interested in this position and would love to discuss it further.", time: "10:23 AM"},
    ],
    "2": [
      {id: "1", sender: "candidate", text: "Hello, I'm Michael and I applied for the Full Stack Developer role.", time: "Sep 12, 1:30 PM"},
      {id: "2", sender: "user", text: "Hi Michael, thanks for applying! Your experience with React and Node.js looks great.", time: "Sep 12, 2:45 PM"},
      {id: "3", sender: "user", text: "We'd like to schedule a technical interview. Are you available next Tuesday?", time: "Sep 12, 2:46 PM"},
      {id: "4", sender: "candidate", text: "Yes, I am available next Tuesday. Looking forward to the technical interview!", time: "Yesterday, 9:15 AM"},
    ],
    "3": [
      {id: "1", sender: "user", text: "Hi Emily, we're pleased to offer you the Product Manager position!", time: "Sep 8, 11:20 AM"},
      {id: "2", sender: "candidate", text: "That's fantastic news! Thank you so much.", time: "Sep 8, 11:45 AM"},
      {id: "3", sender: "user", text: "I've sent the offer letter to your email. Please review it and let me know if you have any questions.", time: "Sep 9, 10:30 AM"},
      {id: "4", sender: "candidate", text: "I've received the offer letter and I'm reviewing it now. Thank you!", time: "Sep 10, 2:15 PM"},
    ]
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedCandidate) return;
    
    // In a real application, we'd send the message to the backend
    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully.",
    });
    
    setMessageText("");
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Messages</h1>
      </div>

      <div className="flex h-[calc(100vh-12rem)] border rounded-lg overflow-hidden bg-white">
        {/* Candidate List */}
        <div className="w-1/3 border-r">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search candidates..." 
                className="pl-8"
              />
            </div>
          </div>
          <div className="overflow-y-auto h-[calc(100%-4rem)]">
            {candidates.map((candidate) => (
              <div 
                key={candidate.id}
                onClick={() => setSelectedCandidate(candidate.id)}
                className={`p-4 border-b cursor-pointer hover:bg-accent ${
                  selectedCandidate === candidate.id ? "bg-accent" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={candidate.avatar} />
                    <AvatarFallback>{candidate.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{candidate.name}</span>
                      <span className="text-xs text-muted-foreground">{candidate.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {candidate.lastMessage}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{candidate.position}</span>
                      {candidate.unread && (
                        <Badge className="h-2 w-2 rounded-full p-0" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Messages Area */}
        <div className="flex-1 flex flex-col">
          {selectedCandidate ? (
            <>
              {/* Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={candidates.find(c => c.id === selectedCandidate)?.avatar} />
                    <AvatarFallback>
                      {candidates.find(c => c.id === selectedCandidate)?.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {candidates.find(c => c.id === selectedCandidate)?.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {candidates.find(c => c.id === selectedCandidate)?.position}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <User size={16} className="mr-2" />
                  View Profile
                </Button>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversations[selectedCandidate]?.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.sender === "user" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-secondary"
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === "user" 
                          ? "text-primary-foreground/70" 
                          : "text-muted-foreground"
                      }`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex items-end gap-2">
                  <Textarea 
                    className="min-h-[80px]"
                    placeholder="Type your message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                  />
                  <Button 
                    className="h-10 px-3" 
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <Card className="p-6 text-center">
                <Mail size={40} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
                <p className="text-muted-foreground">
                  Select a candidate from the list to start messaging
                </p>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
