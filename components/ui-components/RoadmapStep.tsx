
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, CircleDashed } from "lucide-react";
import { CourseProps } from "./CourseCard";

interface RoadmapStepProps {
  step: number;
  title: string;
  description: string;
  skills: string[];
  completed: boolean;
  course: CourseProps;
  onClick: () => void;
}

export const RoadmapStep = ({
  step,
  title,
  description,
  skills,
  completed,
  course,
  onClick,
}: RoadmapStepProps) => {
  return (
    <div className="relative">
      <div className="absolute left-3.5 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700 z-0" />
      
      <div className="relative z-10 flex mb-8">
        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-gray-900 border-2 border-primary mr-4">
          {completed ? (
            <CheckCircle2 className="w-4 h-4 text-primary" />
          ) : (
            <CircleDashed className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
        
        <Card 
          className={`w-full glass-card cursor-pointer transition-all duration-300 hover:shadow-md ${completed ? 'bg-muted/50' : ''}`}
          onClick={onClick}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center mb-1">
              <Badge variant="outline" className="bg-primary/10 text-primary dark:bg-primary/20">
                Step {step}
              </Badge>
              {completed && (
                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  Completed
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="text-sm">{course.platform}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">{description}</p>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
