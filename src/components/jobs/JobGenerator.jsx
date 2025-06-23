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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File } from 'lucide-react';
import { useJobActions } from '@/hooks/use-job-actions';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export function JobGenerator() {
  const { currentUser } = useAuth();
  const [jobTitle, setJobTitle] = useState('');
  const [jobType, setJobType] = useState('full-time');
  const [jobLocation, setJobLocation] = useState('');
  const [keywords, setKeywords] = useState('');
  const [generatedDescription, setGeneratedDescription] = useState('');
  const { isCreating, generateJobDescription, saveJob, publishJob } = useJobActions();

  const handleGenerateJobDescription = async () => {
    if (!jobTitle) {
      toast.error("Please provide at least a job title");
      return;
    }

    const description = await generateJobDescription(jobTitle, jobType, jobLocation, keywords);
    if (description) {
      setGeneratedDescription(description);
    }
  };

  const handleSaveJob = async () => {
    if (!currentUser) {
      toast.error("You must be logged in to save a job");
      return;
    }

    const jobData = {
      title: jobTitle,
      type: jobType,
      location: jobLocation,
      keywords,
      description: generatedDescription,
      status: "draft"
    };

    const result = await saveJob(jobData);
    if (result) {
      toast.success("Job saved as draft");
    }
  };

  const handlePublishJob = async () => {
    if (!currentUser) {
      toast.error("You must be logged in to publish a job");
      return;
    }

    const jobData = {
      title: jobTitle,
      type: jobType,
      location: jobLocation,
      keywords,
      description: generatedDescription
    };

    const result = await publishJob(jobData);
    if (result) {
      toast.success("Job published successfully");
    }
  };

  const handleReset = () => {
    setJobTitle('');
    setJobType('full-time');
    setJobLocation('');
    setKeywords('');
    setGeneratedDescription('');
  };

  return (
    <Card className="w-full">
      <Tabs defaultValue="create">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>AI Job Description Generator</CardTitle>
              <CardDescription>Create professional job descriptions with AI assistance</CardDescription>
            </div>
            <TabsList>
              <TabsTrigger value="create">Create</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
          </div>
        </CardHeader>

        <TabsContent value="create">
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input 
                  id="jobTitle" 
                  placeholder="e.g. Software Engineer" 
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobType">Job Type</Label>
                <Select value={jobType} onValueChange={setJobType}>
                  <SelectTrigger id="jobType">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobLocation">Location</Label>
              <Input 
                id="jobLocation" 
                placeholder="e.g. Remote, New York, NY" 
                value={jobLocation}
                onChange={(e) => setJobLocation(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">
                Keywords (skills, qualifications, etc.)
              </Label>
              <Textarea 
                id="keywords" 
                placeholder="e.g. JavaScript, React, 3+ years experience"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleReset}>Reset</Button>
            <Button 
              onClick={handleGenerateJobDescription}
              disabled={isCreating}
            >
              {isCreating ? (
                <>
                  <File size={16} className="mr-2 animate-spin" />
                  Generating...
                </>
              ) : 'Generate Description'}
            </Button>
          </CardFooter>
        </TabsContent>

        <TabsContent value="preview">
          <CardContent>
            {generatedDescription ? (
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap">{generatedDescription}</div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Fill in job details and generate a description to preview it here.
                </p>
              </div>
            )}
          </CardContent>
          {generatedDescription && (
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleSaveJob} disabled={isCreating}>
                Save Draft
              </Button>
              <Button onClick={handlePublishJob} disabled={isCreating}>
                Publish Job
              </Button>
            </CardFooter>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
}
