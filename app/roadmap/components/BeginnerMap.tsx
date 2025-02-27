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
import { mockRoadmap, RoadmapStepData } from "@/types/roadMap";

const BeginnerMap = () => {
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

export default BeginnerMap;
