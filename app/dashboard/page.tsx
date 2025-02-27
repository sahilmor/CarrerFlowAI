"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Rocket, BookOpen, BarChart, User, LogOut, ChevronRight, Award, Sparkles } from "lucide-react";
import { useAuth } from "@/components/auth-provider";

type CareerPath = {
  title: string;
  description: string;
  matchPercentage: number;
  skills: string[];
  courses: Course[];
};

type Course = {
  id: string;
  title: string;
  provider: string;
  duration: string;
  level: string;
  description: string;
  completed: boolean;
  url: string;
};

export default function DashboardPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [careerPath, setCareerPath] = useState<CareerPath | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user completed the quiz
    const quizData = localStorage.getItem("quizData");
    
    if (!quizData && !user) {
      router.push("/quiz");
      return;
    }

    // Simulate API call to get career path
    const fetchCareerPath = async () => {
      try {
        // In a real app, this would be an API call to your backend
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        // Mock career path data
        const mockCareerPath: CareerPath = {
          title: "Full Stack Developer",
          description: "Based on your skills and interests, you're well-suited for a career as a Full Stack Developer. This role combines front-end and back-end development skills to build complete web applications.",
          matchPercentage: 92,
          skills: ["JavaScript", "React", "Node.js", "Database Management", "API Design", "Problem Solving"],
          courses: [
            {
              id: "course1",
              title: "Modern JavaScript from the Beginning",
              provider: "Udemy",
              duration: "20 hours",
              level: "Beginner",
              description: "Learn modern JavaScript from the beginning, including ES6+ features, asynchronous programming, and more.",
              completed: true,
              url: "https://www.udemy.com/course/modern-javascript-from-the-beginning/",
            },
            {
              id: "course2",
              title: "React - The Complete Guide",
              provider: "Udemy",
              duration: "40 hours",
              level: "Intermediate",
              description: "Dive into React, including Hooks, Redux, React Router, Next.js, and more.",
              completed: true,
              url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
            },
            {
              id: "course3",
              title: "Node.js API Masterclass",
              provider: "Udemy",
              duration: "15 hours",
              level: "Intermediate",
              description: "Build a complete Node.js API with Express, MongoDB, authentication, and more.",
              completed: false,
              url: "https://www.udemy.com/course/nodejs-api-masterclass/",
            },
            {
              id: "course4",
              title: "MongoDB - The Complete Developer's Guide",
              provider: "Udemy",
              duration: "18 hours",
              level: "Intermediate",
              description: "Master MongoDB database design, aggregation, indexing, and performance optimization.",
              completed: false,
              url: "https://www.udemy.com/course/mongodb-the-complete-developers-guide/",
            },
            {
              id: "course5",
              title: "AWS Certified Developer - Associate",
              provider: "A Cloud Guru",
              duration: "30 hours",
              level: "Advanced",
              description: "Learn to deploy and manage applications on AWS, a crucial skill for modern full-stack developers.",
              completed: false,
              url: "https://acloudguru.com/course/aws-certified-developer-associate",
            },
          ],
        };
        
        setCareerPath(mockCareerPath);
        
        // Calculate progress
        const completedCourses = mockCareerPath.courses.filter(course => course.completed).length;
        const totalCourses = mockCareerPath.courses.length;
        setProgress((completedCourses / totalCourses) * 100);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching career path:", error);
        setLoading(false);
      }
    };

    fetchCareerPath();
  }, [router, user]);

  const handleMarkAsCompleted = (courseId: string) => {
    if (careerPath) {
      const updatedCourses = careerPath.courses.map(course => 
        course.id === courseId ? { ...course, completed: true } : course
      );
      
      const updatedCareerPath = { ...careerPath, courses: updatedCourses };
      setCareerPath(updatedCareerPath);
      
      // Recalculate progress
      const completedCourses = updatedCourses.filter(course => course.completed).length;
      const totalCourses = updatedCourses.length;
      setProgress((completedCourses / totalCourses) * 100);
    }
  };

  const nextRecommendedCourse = careerPath?.courses.find(course => !course.completed);

  if (loading || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Rocket className="h-8 w-8 animate-bounce text-primary" />
          <p className="text-lg font-medium">Loading your career dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Rocket className="h-6 w-6 text-primary" />
            <span>CareerPath AI</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
              Dashboard
            </Link>
            <Link href="/roadmap" className="text-sm font-medium hover:underline underline-offset-4">
              Roadmap
            </Link>
            <Link href="/progress" className="text-sm font-medium hover:underline underline-offset-4">
              Progress
            </Link>
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Log out</span>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome{user ? `, ${user.name}` : ""}!</h1>
          <p className="text-muted-foreground">
            Here's your personalized career dashboard
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Recommended Career Path</CardTitle>
              <CardDescription>
                Based on your skills, interests, and goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{careerPath?.title}</h3>
                    <p className="text-muted-foreground">{careerPath?.description}</p>
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xl font-bold text-primary">{careerPath?.matchPercentage}%</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Key Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {careerPath?.skills.map((skill, index) => (
                      <div key={index} className="rounded-full bg-secondary px-3 py-1 text-sm">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/roadmap" passHref className="w-full">
                <Button className="w-full">
                  View Full Career Roadmap
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
                <CardDescription>
                  Track your progress through the recommended courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <span className="text-sm font-medium">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-lg font-semibold mb-4">🚀 Best Next Course for You</h3>
                    {nextRecommendedCourse ? (
                      <div className="rounded-lg border p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{nextRecommendedCourse.title}</h4>
                          <div className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                            {nextRecommendedCourse.level}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{nextRecommendedCourse.description}</p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <span>{nextRecommendedCourse.provider}</span>
                          <span>{nextRecommendedCourse.duration}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => window.open(nextRecommendedCourse.url, '_blank')}
                          >
                            View Course
                          </Button>
                          <Button 
                            className="flex-1"
                            onClick={() => handleMarkAsCompleted(nextRecommendedCourse.id)}
                          >
                            Mark as Completed
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-lg border p-4 text-center">
                        <Award className="h-12 w-12 mx-auto mb-2 text-primary" />
                        <h4 className="font-semibold">Congratulations!</h4>
                        <p className="text-sm text-muted-foreground">
                          You've completed all the recommended courses for your career path.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/progress" passHref className="w-full">
                  <Button variant="outline" className="w-full">
                    View All Courses
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skill Development</CardTitle>
                <CardDescription>
                  Track your progress in key skill areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {careerPath?.skills.slice(0, 5).map((skill, index) => {
                    // Generate random progress for demo
                    const skillProgress = Math.floor(Math.random() * 100);
                    return (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{skill}</span>
                          <span className="text-sm font-medium">{skillProgress}%</span>
                        </div>
                        <Progress value={skillProgress} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/skills" passHref className="w-full">
                  <Button variant="outline" className="w-full">
                    View Skill Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Milestones</CardTitle>
              <CardDescription>
                Key achievements on your career journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Complete Core JavaScript Skills</h4>
                    <p className="text-sm text-muted-foreground">
                      Master the fundamentals of JavaScript to build a solid foundation for web development.
                    </p>
                    <div className="mt-2">
                      <Progress value={75} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">75% completed</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Build First Full-Stack Project</h4>
                    <p className="text-sm text-muted-foreground">
                      Apply your skills by building a complete web application with front-end and back-end components.
                    </p>
                    <div className="mt-2">
                      <Progress value={30} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">30% completed</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Earn Full Stack Developer Certification</h4>
                    <p className="text-sm text-muted-foreground">
                      Complete all required courses and projects to earn your certification.
                    </p>
                    <div className="mt-2">
                      <Progress value={40} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">40% completed</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}