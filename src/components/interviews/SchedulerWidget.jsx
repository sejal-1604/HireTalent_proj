import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export function SchedulerWidget() {
  const { toast } = useToast();
  const [date, setDate] = useState(undefined);
  const [timeSlot, setTimeSlot] = useState("");
  const [interviewType, setInterviewType] = useState("");

  const timeSlots = [
    "9:00 AM - 9:30 AM",
    "9:30 AM - 10:00 AM",
    "10:00 AM - 10:30 AM",
    "10:30 AM - 11:00 AM",
    "11:00 AM - 11:30 AM",
    "11:30 AM - 12:00 PM",
    "1:00 PM - 1:30 PM",
    "1:30 PM - 2:00 PM",
    "2:00 PM - 2:30 PM",
    "2:30 PM - 3:00 PM",
    "3:00 PM - 3:30 PM",
    "3:30 PM - 4:00 PM",
  ];

  const interviewTypes = [
    "Initial Screening",
    "Technical Interview",
    "Culture Fit",
    "Final Round",
  ];

  const handleSchedule = () => {
    if (!date || !timeSlot || !interviewType) {
      toast({
        title: "Missing information",
        description: "Please select date, time and interview type",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Interview Scheduled",
      description: `You've scheduled a ${interviewType} interview on ${date.toDateString()} at ${timeSlot}`,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Schedule Interview</CardTitle>
        <CardDescription>Schedule interviews with candidates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2">
          <Label>Select Date</Label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="border rounded-md"
            disabled={(date) => {
              const day = date.getDay();
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return date < today || day === 0 || day === 6;
            }}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="timeSlot">Select Time</Label>
          <Select value={timeSlot} onValueChange={setTimeSlot}>
            <SelectTrigger id="timeSlot">
              <SelectValue placeholder="Select time slot" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>{slot}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="interviewType">Interview Type</Label>
          <Select value={interviewType} onValueChange={setInterviewType}>
            <SelectTrigger id="interviewType">
              <SelectValue placeholder="Select interview type" />
            </SelectTrigger>
            <SelectContent>
              {interviewTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSchedule}>Schedule Interview</Button>
      </CardFooter>
    </Card>
  );
}
