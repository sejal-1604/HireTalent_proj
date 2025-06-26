
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { File, User, Calendar } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      <header className="bg-background border-b">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="font-bold text-white">HT</span>
            </div>
            <span className="font-bold text-xl">HireTalent</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Login
            </Link>
            <Button asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      
      <div className="hero-gradient text-white py-20 px-4 md:py-32">
        <div className="container flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold text-center max-w-3xl">
            AI-Powered Hiring Platform for Modern Teams
          </h1>
          <p className="mt-6 text-lg md:text-xl text-center max-w-2xl">
            Streamline your hiring process with AI job descriptions, smart resume parsing, and seamless interview scheduling
          </p>
          <div className="mt-8 flex gap-4">
            <Button size="lg" variant="default" asChild className="bg-white text-primary hover:bg-white/90">
              <Link to="/register">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
              <Link to="/dashboard">View Demo</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container py-20">
        <h2 className="text-3xl font-bold text-center">All-in-One Recruitment Solution</h2>
        <p className="mt-4 text-lg text-center text-muted-foreground max-w-2xl mx-auto">
          Everything you need to hire faster, smarter, and with better results
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          <div className="p-6 border rounded-lg">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
              <File size={24} />
            </div>
            <h3 className="text-xl font-semibold">AI Job Descriptions</h3>
            <p className="mt-2 text-muted-foreground">
              Generate professional job descriptions in seconds using AI
            </p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
              <User size={24} />
            </div>
            <h3 className="text-xl font-semibold">Resume Parsing</h3>
            <p className="mt-2 text-muted-foreground">
              Automatically extract key information from candidate resumes
            </p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Calendar size={24} />
            </div>
            <h3 className="text-xl font-semibold">Interview Scheduling</h3>
            <p className="mt-2 text-muted-foreground">
              Streamline interview scheduling with candidate self-booking
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-secondary py-20">
        <div className="container">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-center">Ready to transform your hiring process?</h2>
            <p className="mt-4 text-lg text-center text-muted-foreground max-w-2xl">
              Join thousands of companies using HireTalent to hire better candidates, faster
            </p>
            <Button size="lg" className="mt-8" asChild>
              <Link to="/register">Start Your Free Trial</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <footer className="bg-background border-t py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="font-bold text-white">HT</span>
                </div>
                <span className="font-bold">HireTalent</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                AI-powered hiring platform for modern teams
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-medium mb-3">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Features</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Pricing</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Demo</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Documentation</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Blog</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Support</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">About</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Legal</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} HireTalent. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-foreground">Privacy Policy</a>
              <a href="#" className="hover:text-foreground">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
