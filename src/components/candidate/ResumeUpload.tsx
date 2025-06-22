
import { useState } from 'react';
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
import { useToast } from '@/hooks/use-toast';
import { CheckCheck, File, Upload, X } from 'lucide-react';

export function ResumeUpload() {
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or Word document",
        variant: "destructive",
      });
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "File too large",
        description: "Maximum file size is 5MB",
        variant: "destructive",
      });
      return;
    }
    
    setFile(file);
    setUploadSuccess(false);
  };

  const uploadResume = async () => {
    if (!file) return;
    
    setUploading(true);
    
    try {
      // This is where we would handle actual file upload
      // For now, simulating with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setUploadSuccess(true);
      toast({
        title: "Resume uploaded successfully",
        description: "Your resume has been uploaded and is being processed.",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setUploadSuccess(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Resume Upload</CardTitle>
        <CardDescription>
          Upload candidate resumes to analyze and process applications
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!file ? (
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center ${
              dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/30"
            }`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Upload size={24} />
              </div>
              <div className="space-y-1">
                <p className="font-medium">Drag & drop resume here</p>
                <p className="text-sm text-muted-foreground">
                  Supports PDF, DOC, DOCX (Max 5MB)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <hr className="w-16 border-muted-foreground/30" />
                <span className="text-xs uppercase text-muted-foreground">Or</span>
                <hr className="w-16 border-muted-foreground/30" />
              </div>
              <Label
                htmlFor="resume-upload"
                className="cursor-pointer inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Browse Files
                <Input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="sr-only"
                  onChange={handleChange}
                />
              </Label>
            </div>
          </div>
        ) : (
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                  <File size={20} />
                </div>
                <div>
                  <p className="font-medium truncate max-w-[200px]">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {uploadSuccess && (
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <CheckCheck size={16} />
                  </div>
                )}
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={removeFile}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <X size={16} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={uploadResume}
          disabled={!file || uploading || uploadSuccess}
        >
          {uploading ? "Uploading..." : uploadSuccess ? "Uploaded" : "Upload Resume"}
        </Button>
      </CardFooter>
    </Card>
  );
}
