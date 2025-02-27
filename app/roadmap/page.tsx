'use client'
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Download, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CourseCard, CourseProps } from "@/components/ui-components/CourseCard";
import { RoadmapStep } from "@/components/ui-components/RoadmapStep";

interface RoadmapStepData {
  step: number;
  title: string;
  description: string;
  skills: string[];
  completed: boolean;
  course: CourseProps;
}

const mockRoadmap: RoadmapStepData[] = [
  {
    step: 1,
    title: "HTML & CSS Fundamentals",
    description: "Master the basics of web development with HTML and CSS.",
    skills: ["HTML5", "CSS3", "Responsive Design"],
    completed: true,
    course: {
      id: "course-1",
      title: "HTML & CSS Essentials",
      description: "Learn the fundamentals of web development with HTML and CSS.",
      platform: "Codecademy",
      duration: "8 hours",
      level: "Beginner",
      link: "https://example.com/course",
      completed: true,
    },
  },
  {
    step: 2,
    title: "JavaScript Essentials",
    description: "Learn JavaScript programming and DOM manipulation.",
    skills: ["JavaScript", "DOM", "ES6+"],
    completed: true,
    course: {
      id: "course-2",
      title: "JavaScript Basics",
      description: "Introduction to JavaScript programming for beginners.",
      platform: "freeCodeCamp",
      duration: "10 hours",
      level: "Beginner",
      link: "https://example.com/course",
      completed: true,
    },
  },
  {
    step: 3,
    title: "Advanced JavaScript",
    description: "Deep dive into advanced JavaScript concepts.",
    skills: ["Closures", "Promises", "Async/Await"],
    completed: false,
    course: {
      id: "course-3",
      title: "Advanced JavaScript Concepts",
      description: "Master complex JavaScript topics including closures, prototypes, and async patterns to build more efficient applications.",
      platform: "Udemy",
      duration: "12 hours",
      level: "Intermediate",
      link: "https://example.com/course",
      completed: false,
    },
  },
  {
    step: 4,
    title: "React & Frontend Frameworks",
    description: "Build interactive UI components with React.",
    skills: ["React", "Redux", "Hooks"],
    completed: false,
    course: {
      id: "course-4",
      title: "React & Redux Fundamentals",
      description: "Learn the core concepts of React and state management with Redux to build interactive UIs.",
      platform: "Coursera",
      duration: "20 hours",
      level: "Intermediate",
      link: "https://example.com/course",
      completed: false,
    },
  },
  {
    step: 5,
    title: "Backend Development",
    description: "Create server-side applications with Node.js.",
    skills: ["Node.js", "Express", "MongoDB"],
    completed: false,
    course: {
      id: "course-5",
      title: "Node.js Backend Development",
      description: "Build scalable backend services with Node.js, Express, and MongoDB.",
      platform: "Udacity",
      duration: "25 hours",
      level: "Intermediate",
      link: "https://example.com/course",
      completed: false,
    },
  },
  {
    step: 6,
    title: "Full Stack Projects",
    description: "Build complete web applications from start to finish.",
    skills: ["Full Stack", "API Design", "Authentication"],
    completed: false,
    course: {
      id: "course-6",
      title: "Full Stack Web Development",
      description: "Create complete web applications with modern frontend and backend technologies.",
      platform: "Pluralsight",
      duration: "30 hours",
      level: "Advanced",
      link: "https://example.com/course",
      completed: false,
    },
  },
  {
    step: 7,
    title: "DevOps & Deployment",
    description: "Learn to deploy and manage web applications in the cloud.",
    skills: ["Docker", "CI/CD", "AWS/Azure"],
    completed: false,
    course: {
      id: "course-7",
      title: "DevOps for Developers",
      description: "Master the tools and practices for deploying and managing applications in production.",
      platform: "edX",
      duration: "15 hours",
      level: "Advanced",
      link: "https://example.com/course",
      completed: false,
    },
  },
  {
    step: 8,
    title: "Career Preparation",
    description: "Prepare for job interviews and build your portfolio.",
    skills: ["Portfolio", "Technical Interviews", "Networking"],
    completed: false,
    course: {
      id: "course-8",
      title: "Technical Interview Preparation",
      description: "Learn strategies and practice solving common coding interview questions.",
      platform: "Educative",
      duration: "10 hours",
      level: "Intermediate",
      link: "https://example.com/course",
      completed: false,
    },
  },
];

const RoadmapPage = () => {
  const [selectedStep, setSelectedStep] = useState<RoadmapStepData | null>(null);
  const { toast } = useToast();
  
  const completedSteps = mockRoadmap.filter(step => step.completed).length;
  const totalSteps = mockRoadmap.length;
  const progress = Math.round((completedSteps / totalSteps) * 100);

  const handleStepClick = (step: RoadmapStepData) => {
    setSelectedStep(step);
  };

  const handleDownload = () => {
    toast({
      title: "Roadmap Downloaded",
      description: "Your career roadmap has been downloaded as a PDF.",
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-12 animate-fade-in">
      <div className="container max-w-4xl mx-auto px-4">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-medium mb-2">Your Career Roadmap</h1>
              <p className="text-muted-foreground">
                Your personalized path to becoming a Full Stack Developer
              </p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center"
                onClick={handleDownload}
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <ListFilter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
          
          <Card className="glass-card">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Overall Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-sm">
                <span>{completedSteps} of {totalSteps} steps completed</span>
                <span className="font-medium">{totalSteps - completedSteps} remaining</span>
              </div>
            </CardContent>
          </Card>
        </header>

        {/* Roadmap Timeline */}
        <div className="mb-10 pl-4">
          {mockRoadmap.map((step, index) => (
            <RoadmapStep
              key={index}
              step={step.step}
              title={step.title}
              description={step.description}
              skills={step.skills}
              completed={step.completed}
              course={step.course}
              onClick={() => handleStepClick(step)}
            />
          ))}
        </div>
      </div>

      {/* Selected Step Dialog */}
      <Dialog open={!!selectedStep} onOpenChange={() => setSelectedStep(null)}>
        {selectedStep && (
          <DialogContent className="max-w-2xl glass-card">
            <DialogHeader>
              <div className="flex justify-between items-start">
                <div>
                  <DialogTitle className="text-2xl">
                    {selectedStep.title}
                  </DialogTitle>
                  <DialogDescription className="mt-1">
                    Step {selectedStep.step} of {totalSteps}
                  </DialogDescription>
                </div>
                {selectedStep.completed && (
                  <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    Completed
                  </Badge>
                )}
              </div>
            </DialogHeader>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{selectedStep.description}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Skills You'll Learn</h3>
                <div className="flex flex-wrap gap-1.5">
                  {selectedStep.skills.map((skill, i) => (
                    <Badge key={i} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Recommended Course</h3>
                <CourseCard 
                  course={selectedStep.course} 
                  onMarkComplete={selectedStep.completed ? undefined : (id) => {
                    // This would update the course completion status in a real app
                    toast({
                      title: "Course Marked as Complete",
                      description: "Your progress has been updated.",
                    });
                    setSelectedStep(null);
                  }} 
                />
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default RoadmapPage;
