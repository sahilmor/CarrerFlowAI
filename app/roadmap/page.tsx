"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, ExternalLink, BookOpen, Code, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { NavigationBar } from "@/components/ui-components/NavigationBar";
import Footer from "@/components/ui-components/Footer";

// Types based on the provided schema
type Course = {
  platform: string;
  name: string;
  link: string;
  focus: string;
  completed?: boolean;
};

type Project = {
  name: string;
  description: string;
  completed?: boolean;
};

type Step = {
  title: string;
  description: string;
  courses: Course[];
  projects: Project[];
};

type LearningPhase = {
  timeline: string;
  description: string;
  steps: Step[];
};

type LearningPath = {
  Beginner: LearningPhase;
  Intermediate: LearningPhase;
  Advanced: LearningPhase;
};

export default function RoadmapPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("beginner");

  useEffect(() => {
    if (!authLoading && !user) {
      // Check if there's quiz data in localStorage
      const quizData = localStorage.getItem("quizData");
      if (!quizData) {
        router.push("/quiz");
        return;
      }
    }
    
    // Fetch or mock learning path data
    const fetchLearningPath = async () => {
      try {
        // In a real app, this would be an API call to your backend
        // For now, we'll use mock data
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock learning path data
        const mockLearningPath: LearningPath = {
          Beginner: {
            timeline: "1-3 months",
            description: "Build a strong foundation in web development fundamentals",
            steps: [
              {
                title: "HTML & CSS Fundamentals",
                description: "Learn the building blocks of web development",
                courses: [
                  {
                    platform: "freeCodeCamp",
                    name: "Responsive Web Design Certification",
                    link: "https://www.freecodecamp.org/learn/responsive-web-design/",
                    focus: "HTML, CSS, Responsive Design",
                    completed: true
                  },
                  {
                    platform: "Udemy",
                    name: "Modern HTML & CSS From The Beginning",
                    link: "https://www.udemy.com/course/modern-html-css-from-the-beginning/",
                    focus: "HTML5, CSS3, Flexbox, Grid",
                    completed: false
                  }
                ],
                projects: [
                  {
                    name: "Personal Portfolio Website",
                    description: "Create a responsive portfolio website to showcase your projects",
                    completed: true
                  }
                ]
              },
              {
                title: "JavaScript Basics",
                description: "Learn the fundamentals of JavaScript programming",
                courses: [
                  {
                    platform: "freeCodeCamp",
                    name: "JavaScript Algorithms and Data Structures",
                    link: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
                    focus: "JavaScript, Algorithms, Data Structures",
                    completed: false
                  },
                  {
                    platform: "Udemy",
                    name: "Modern JavaScript From The Beginning",
                    link: "https://www.udemy.com/course/modern-javascript-from-the-beginning/",
                    focus: "JavaScript, DOM, Async JS",
                    completed: false
                  }
                ],
                projects: [
                  {
                    name: "Interactive Form Validation",
                    description: "Build a form with client-side validation using JavaScript",
                    completed: false
                  },
                  {
                    name: "Weather App",
                    description: "Create a weather application using a public API",
                    completed: false
                  }
                ]
              }
            ]
          },
          Intermediate: {
            timeline: "3-6 months",
            description: "Expand your skills with modern frameworks and backend development",
            steps: [
              {
                title: "React Fundamentals",
                description: "Learn the most popular JavaScript library for building user interfaces",
                courses: [
                  {
                    platform: "Udemy",
                    name: "React - The Complete Guide",
                    link: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
                    focus: "React, Hooks, Context API",
                    completed: false
                  },
                  {
                    platform: "Scrimba",
                    name: "The Frontend Developer Career Path",
                    link: "https://scrimba.com/learn/frontend",
                    focus: "React, JavaScript, CSS",
                    completed: false
                  }
                ],
                projects: [
                  {
                    name: "Task Management App",
                    description: "Build a task management application with React",
                    completed: false
                  }
                ]
              },
              {
                title: "Node.js & Express",
                description: "Learn server-side JavaScript with Node.js and Express",
                courses: [
                  {
                    platform: "Udemy",
                    name: "Node.js API Masterclass",
                    link: "https://www.udemy.com/course/nodejs-api-masterclass/",
                    focus: "Node.js, Express, MongoDB",
                    completed: false
                  },
                  {
                    platform: "YouTube",
                    name: "Node.js Tutorial for Beginners",
                    link: "https://www.youtube.com/watch?v=TlB_eWDSMt4",
                    focus: "Node.js Basics",
                    completed: false
                  }
                ],
                projects: [
                  {
                    name: "RESTful API",
                    description: "Create a RESTful API with Node.js and Express",
                    completed: false
                  }
                ]
              }
            ]
          },
          Advanced: {
            timeline: "6-12 months",
            description: "Master advanced concepts and specialize in your chosen area",
            steps: [
              {
                title: "Full Stack Development",
                description: "Combine frontend and backend skills to build complete applications",
                courses: [
                  {
                    platform: "Udemy",
                    name: "MERN Stack Front To Back",
                    link: "https://www.udemy.com/course/mern-stack-front-to-back/",
                    focus: "MongoDB, Express, React, Node.js",
                    completed: false
                  },
                  {
                    platform: "Coursera",
                    name: "Full Stack Web Development with React",
                    link: "https://www.coursera.org/specializations/full-stack-react",
                    focus: "React, Node.js, MongoDB",
                    completed: false
                  }
                ],
                projects: [
                  {
                    name: "E-commerce Platform",
                    description: "Build a full-featured e-commerce platform with user authentication, product catalog, and payment processing",
                    completed: false
                  }
                ]
              },
              {
                title: "DevOps & Deployment",
                description: "Learn to deploy and manage applications in production",
                courses: [
                  {
                    platform: "Udemy",
                    name: "Docker and Kubernetes: The Complete Guide",
                    link: "https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/",
                    focus: "Docker, Kubernetes, CI/CD",
                    completed: false
                  },
                  {
                    platform: "A Cloud Guru",
                    name: "AWS Certified Developer - Associate",
                    link: "https://acloudguru.com/course/aws-certified-developer-associate",
                    focus: "AWS, Cloud Deployment",
                    completed: false
                  }
                ],
                projects: [
                  {
                    name: "Containerized Application Deployment",
                    description: "Deploy a full-stack application using Docker and a cloud provider",
                    completed: false
                  }
                ]
              }
            ]
          }
        };
        
        setLearningPath(mockLearningPath);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching learning path:", error);
        setIsLoading(false);
      }
    };
    
    fetchLearningPath();
  }, [router, user, authLoading]);

  const handleMarkCompleted = (
    phase: keyof LearningPath,
    stepIndex: number,
    itemType: 'course' | 'project',
    itemIndex: number
  ) => {
    if (!learningPath) return;
    
    const updatedLearningPath = { ...learningPath };
    
    if (itemType === 'course') {
      updatedLearningPath[phase].steps[stepIndex].courses[itemIndex].completed = 
        !updatedLearningPath[phase].steps[stepIndex].courses[itemIndex].completed;
    } else {
      updatedLearningPath[phase].steps[stepIndex].projects[itemIndex].completed = 
        !updatedLearningPath[phase].steps[stepIndex].projects[itemIndex].completed;
    }
    
    setLearningPath(updatedLearningPath);
    
    // In a real app, you would save this to your backend
    // saveProgress(updatedLearningPath);
  };

  if (isLoading || authLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-lg font-medium">Loading your learning roadmap...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <NavigationBar />
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Learning Roadmap</h1>
          <p className="text-muted-foreground">
            Follow this personalized learning path to achieve your career goals
          </p>
        </div>

        {learningPath ? (
          <Tabs defaultValue="beginner" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="beginner">Beginner</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
            
            <TabsContent value="beginner" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Beginner Phase</CardTitle>
                  <CardDescription>
                    Timeline: {learningPath.Beginner.timeline} • {learningPath.Beginner.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RoadmapPhase 
                    phase={learningPath.Beginner} 
                    phaseKey="Beginner" 
                    onMarkCompleted={handleMarkCompleted} 
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="intermediate" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Intermediate Phase</CardTitle>
                  <CardDescription>
                    Timeline: {learningPath.Intermediate.timeline} • {learningPath.Intermediate.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RoadmapPhase 
                    phase={learningPath.Intermediate} 
                    phaseKey="Intermediate" 
                    onMarkCompleted={handleMarkCompleted} 
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="advanced" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Phase</CardTitle>
                  <CardDescription>
                    Timeline: {learningPath.Advanced.timeline} • {learningPath.Advanced.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RoadmapPhase 
                    phase={learningPath.Advanced} 
                    phaseKey="Advanced" 
                    onMarkCompleted={handleMarkCompleted} 
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No learning path found. Please complete the career quiz.</p>
            <Button className="mt-4" onClick={() => router.push("/quiz")}>
              Take Career Quiz
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

interface RoadmapPhaseProps {
  phase: LearningPhase;
  phaseKey: keyof LearningPath;
  onMarkCompleted: (
    phase: keyof LearningPath,
    stepIndex: number,
    itemType: 'course' | 'project',
    itemIndex: number
  ) => void;
}

function RoadmapPhase({ phase, phaseKey, onMarkCompleted }: RoadmapPhaseProps) {
  return (
    <div className="space-y-6">
      {phase.steps.map((step, stepIndex) => (
        <div key={stepIndex} className="border rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
          <p className="text-muted-foreground mb-4">{step.description}</p>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium flex items-center mb-2">
                <BookOpen className="h-5 w-5 mr-2 text-primary" />
                Recommended Courses
              </h4>
              <div className="space-y-3">
                {step.courses.map((course, courseIndex) => (
                  <div 
                    key={courseIndex} 
                    className={`border rounded-md p-3 ${course.completed ? 'bg-primary/5 border-primary/20' : ''}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium">{course.name}</h5>
                        <p className="text-sm text-muted-foreground">{course.platform} • Focus: {course.focus}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(course.link, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button 
                          variant={course.completed ? "default" : "outline"} 
                          size="sm"
                          onClick={() => onMarkCompleted(phaseKey, stepIndex, 'course', courseIndex)}
                        >
                          {course.completed ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Completed
                            </>
                          ) : (
                            "Mark Complete"
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {step.projects.length > 0 && (
              <div>
                <h4 className="text-lg font-medium flex items-center mb-2">
                  <Code className="h-5 w-5 mr-2 text-primary" />
                  Projects
                </h4>
                <div className="space-y-3">
                  {step.projects.map((project, projectIndex) => (
                    <div 
                      key={projectIndex} 
                      className={`border rounded-md p-3 ${project.completed ? 'bg-primary/5 border-primary/20' : ''}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium">{project.name}</h5>
                          <p className="text-sm text-muted-foreground">{project.description}</p>
                        </div>
                        <Button 
                          variant={project.completed ? "default" : "outline"} 
                          size="sm"
                          onClick={() => onMarkCompleted(phaseKey, stepIndex, 'project', projectIndex)}
                        >
                          {project.completed ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Completed
                            </>
                          ) : (
                            "Mark Complete"
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}