
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Download, BarChart3, TrendingUp, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CourseCard, CourseProps } from "@/components/ui-components/CourseCard";

// Mock data
const mockCompletedCourses: CourseProps[] = [
  {
    id: "course-1",
    title: "HTML & CSS Essentials",
    description: "Learn the fundamentals of web development with HTML and CSS.",
    platform: "Codecademy",
    duration: "8 hours",
    level: "Beginner",
    link: "https://example.com/course",
    completed: true,
  },
  {
    id: "course-2",
    title: "JavaScript Basics",
    description: "Introduction to JavaScript programming for beginners.",
    platform: "freeCodeCamp",
    duration: "10 hours",
    level: "Beginner",
    link: "https://example.com/course",
    completed: true,
  },
];

const mockInProgressCourses: CourseProps[] = [
  {
    id: "course-3",
    title: "Advanced JavaScript Concepts",
    description: "Master complex JavaScript topics including closures, prototypes, and async patterns to build more efficient applications.",
    platform: "Udemy",
    duration: "12 hours",
    level: "Intermediate",
    link: "https://example.com/course",
    completed: false,
  },
];

const mockSkills = [
  { name: "HTML5", proficiency: 90 },
  { name: "CSS3", proficiency: 85 },
  { name: "JavaScript", proficiency: 70 },
  { name: "Responsive Design", proficiency: 80 },
  { name: "DOM Manipulation", proficiency: 65 },
  { name: "ES6+", proficiency: 60 },
];

const mockCertifications = [
  {
    name: "Web Development Foundations",
    issuer: "Codecademy",
    date: "March 2023",
    link: "https://example.com",
  },
  {
    name: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "May 2023",
    link: "https://example.com",
  },
];

const ProgressPage = () => {
  const { toast } = useToast();
  
  const totalCourses = mockCompletedCourses.length + mockInProgressCourses.length + 5; // +5 for upcoming courses
  const completedCourses = mockCompletedCourses.length;
  const progress = Math.round((completedCourses / totalCourses) * 100);
  
  const totalHours = 18; // Sum of completed course hours
  const totalSkills = mockSkills.length;

  const handleMarkComplete = (id: string) => {
    toast({
      title: "Course Marked as Complete",
      description: "Your progress has been updated.",
    });
  };

  const handleDownloadCertificate = () => {
    toast({
      title: "Certificate Downloaded",
      description: "Your certificate has been downloaded successfully.",
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-12 animate-fade-in">
      <div className="container max-w-6xl mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-medium mb-2">Your Learning Progress</h1>
          <p className="text-muted-foreground">
            Track your journey to becoming a Full Stack Developer
          </p>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card animate-fade-up">
            <CardContent className="p-6 flex flex-col">
              <div className="rounded-full bg-primary/10 p-2 w-fit mb-4">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Courses Completed</p>
              <p className="text-2xl font-medium">{completedCourses}/{totalCourses}</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card animate-fade-up" style={{ animationDelay: "100ms" }}>
            <CardContent className="p-6 flex flex-col">
              <div className="rounded-full bg-primary/10 p-2 w-fit mb-4">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Learning Hours</p>
              <p className="text-2xl font-medium">{totalHours} hours</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card animate-fade-up" style={{ animationDelay: "200ms" }}>
            <CardContent className="p-6 flex flex-col">
              <div className="rounded-full bg-primary/10 p-2 w-fit mb-4">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Skills Gained</p>
              <p className="text-2xl font-medium">{totalSkills}</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card animate-fade-up" style={{ animationDelay: "300ms" }}>
            <CardContent className="p-6 flex flex-col">
              <div className="rounded-full bg-primary/10 p-2 w-fit mb-4">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Certifications</p>
              <p className="text-2xl font-medium">{mockCertifications.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Overall Progress */}
        <Card className="mb-8 glass-card">
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
            <CardDescription>Your journey toward becoming a Full Stack Developer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Career Roadmap Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <BarChart3 className="h-4 w-4 mr-2" />
              <span>You're making good progress! Keep it up to reach your career goal faster.</span>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Progress Tabs */}
        <Tabs defaultValue="courses" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses" className="space-y-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-medium mb-4 flex items-center">
                  <Badge variant="outline" className="mr-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    Completed
                  </Badge>
                  Completed Courses
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {mockCompletedCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-medium mb-4 flex items-center">
                  <Badge variant="outline" className="mr-3 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                    In Progress
                  </Badge>
                  In Progress
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {mockInProgressCourses.map(course => (
                    <CourseCard key={course.id} course={course} onMarkComplete={handleMarkComplete} />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="skills">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Skills Proficiency</CardTitle>
                <CardDescription>Your estimated skill levels based on completed courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {mockSkills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{skill.name}</span>
                        <span>{skill.proficiency}%</span>
                      </div>
                      <Progress value={skill.proficiency} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="certifications">
            <div className="grid md:grid-cols-2 gap-6">
              {mockCertifications.map((cert, index) => (
                <Card key={index} className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-lg">{cert.name}</CardTitle>
                    <CardDescription>{cert.issuer}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-4">Issued: {cert.date}</p>
                    <Button variant="outline" size="sm" className="flex items-center" onClick={handleDownloadCertificate}>
                      <Download className="mr-2 h-4 w-4" />
                      Download Certificate
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProgressPage;
