
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, ExternalLink } from "lucide-react";

export interface CourseProps {
  id: string;
  title: string;
  description: string;
  platform: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  link: string;
  completed?: boolean;
}

interface CourseCardProps {
  level: "Beginner" | "Intermediate" | "Advanced";
  course: CourseProps;
  onMarkComplete?: (id: string) => void;
}

export const CourseCard = ({ level,course, onMarkComplete }: CourseCardProps) => {
  const levelColors = {
    Beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    Advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg glass-card animate-scale-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className={levelColors[level]}>
            {level}
          </Badge>
          {course.completed && (
            <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              Completed
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl">{course.title}</CardTitle>
        <CardDescription className="text-sm">
          {course.platform}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock size={16} className="mr-1" />
          <span>{course.duration}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <Button variant="outline" size="sm" asChild>
          <a href={course.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
            View Course <ExternalLink size={14} className="ml-1" />
          </a>
        </Button>
        {!course.completed && onMarkComplete && (
          <Button variant="ghost" size="sm" onClick={() => onMarkComplete(course.id)} className="flex items-center">
            <CheckCircle size={14} className="mr-1" /> Mark Complete
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
