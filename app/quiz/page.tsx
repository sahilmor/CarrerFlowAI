"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Rocket, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';

type QuizStep = {
  title: string;
  description: string;
  fields: any[];
};

export default function QuizPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentRole: "",
    yearsExperience: "",
    education: "",
    skills: [] as string[],
    interests: [] as string[],
    careerGoals: "",
    preferredWorkEnvironment: "",
    learningStyle: "",
  });

  const steps: QuizStep[] = [
    {
      title: "Personal Information",
      description: "Let's start with some basic information about you",
      fields: [
        {
          name: "name",
          label: "Full Name",
          type: "input",
          placeholder: "Enter your full name",
          required: true,
        },
        {
          name: "email",
          label: "Email Address",
          type: "input",
          placeholder: "Enter your email address",
          required: true,
        },
      ],
    },
    {
      title: "Current Status",
      description: "Tell us about your current professional status",
      fields: [
        {
          name: "currentRole",
          label: "Current Role",
          type: "input",
          placeholder: "e.g., Software Developer, Student, Marketing Manager",
          required: true,
        },
        {
          name: "yearsExperience",
          label: "Years of Experience",
          type: "radio",
          options: [
            { value: "0-1", label: "0-1 years" },
            { value: "1-3", label: "1-3 years" },
            { value: "3-5", label: "3-5 years" },
            { value: "5-10", label: "5-10 years" },
            { value: "10+", label: "10+ years" },
          ],
          required: true,
        },
        {
          name: "education",
          label: "Highest Education Level",
          type: "radio",
          options: [
            { value: "high-school", label: "High School" },
            { value: "associate", label: "Associate Degree" },
            { value: "bachelor", label: "Bachelor's Degree" },
            { value: "master", label: "Master's Degree" },
            { value: "phd", label: "PhD or Doctorate" },
            { value: "self-taught", label: "Self-taught" },
          ],
          required: true,
        },
      ],
    },
    {
      title: "Skills & Interests",
      description: "Select your skills and areas of interest",
      fields: [
        {
          name: "skills",
          label: "Technical Skills",
          type: "checkbox",
          options: [
            { value: "programming", label: "Programming/Coding" },
            { value: "data-analysis", label: "Data Analysis" },
            { value: "design", label: "Design (UI/UX, Graphic)" },
            { value: "writing", label: "Content Writing" },
            { value: "marketing", label: "Digital Marketing" },
            { value: "project-management", label: "Project Management" },
            { value: "sales", label: "Sales" },
            { value: "customer-service", label: "Customer Service" },
            { value: "finance", label: "Finance/Accounting" },
            { value: "leadership", label: "Leadership" },
          ],
          required: true,
        },
        {
          name: "interests",
          label: "Areas of Interest",
          type: "checkbox",
          options: [
            { value: "ai", label: "Artificial Intelligence" },
            { value: "web-development", label: "Web Development" },
            { value: "mobile-development", label: "Mobile Development" },
            { value: "data-science", label: "Data Science" },
            { value: "cybersecurity", label: "Cybersecurity" },
            { value: "cloud-computing", label: "Cloud Computing" },
            { value: "blockchain", label: "Blockchain" },
            { value: "iot", label: "Internet of Things" },
            { value: "product-management", label: "Product Management" },
            { value: "entrepreneurship", label: "Entrepreneurship" },
          ],
          required: true,
        },
      ],
    },
    {
      title: "Career Goals",
      description: "Tell us about your career aspirations",
      fields: [
        {
          name: "careerGoals",
          label: "What are your career goals for the next 3-5 years?",
          type: "textarea",
          placeholder: "Describe your career aspirations and goals...",
          required: true,
        },
        {
          name: "preferredWorkEnvironment",
          label: "Preferred Work Environment",
          type: "radio",
          options: [
            { value: "startup", label: "Startup" },
            { value: "corporate", label: "Corporate" },
            { value: "agency", label: "Agency" },
            { value: "freelance", label: "Freelance/Independent" },
            { value: "remote", label: "Remote-first" },
            { value: "hybrid", label: "Hybrid" },
          ],
          required: true,
        },
        {
          name: "learningStyle",
          label: "Preferred Learning Style",
          type: "radio",
          options: [
            { value: "visual", label: "Visual (videos, diagrams)" },
            { value: "reading", label: "Reading (books, articles)" },
            { value: "interactive", label: "Interactive (projects, exercises)" },
            { value: "social", label: "Social (group learning, discussions)" },
            { value: "mixed", label: "Mixed (combination of styles)" },
          ],
          required: true,
        },
      ],
    },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        [field]: [...(formData[field as keyof typeof formData] as string[]), value],
      });
    } else {
      setFormData({
        ...formData,
        [field]: (formData[field as keyof typeof formData] as string[]).filter(
          (item) => item !== value
        ),
      });
    }
  };

  const handleNext = () => {
    // Validate current step
    const currentFields = steps[currentStep].fields;
    let isValid = true;

    for (const field of currentFields) {
      if (field.required) {
        const value = formData[field.name as keyof typeof formData];
        if (!value || (Array.isArray(value) && value.length === 0)) {
          isValid = false;
          toast({
            title: "Missing information",
            description: `Please fill in the ${field.label} field.`,
            variant: "destructive",
          });
          break;
        }
      }
    }

    if (isValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };


  const findRoadMap = async () => {
    const currentQuestion = `You are an experienced career counselor and roadmap planner, helping students and early-career developers shape their learning paths to become industry-ready. Below is the profile of a user in JSON format. Based on this, generate a step-by-step **learning roadmap** that guides the user from their current stage to their dream role. 
The output should be strictly in JSON format with clear sections for each phase of the roadmap (Beginner, Intermediate, Advanced) along with estimated timelines, recommended best courses of some platform like udemy,coursera and likedin learing along with their links, and key projects to build at each step.
User Profile (JSON):
{
name:"Nitish",
email :"nitish@gmail.com",
skills:["html","css","js"],
experience:"0 - 5 years",
carrerGoal:"full stack developer",
educationLevel:"Bachelors",
currentRole:"Student",
areaOfInterest:["web development","front-end development","fullstack development"]
}

below i have the data type of the roadmap in JSON format strictly follow this format:
type Course = {
    platform: string;
    name: string;
    link: string;
    focus: string;
};

type Project = {
    name: string;
    description: string;
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

type RoadmapData = {
    roadmap: {
        user: {
            name: string;
            skills: string[];
            experience: '0 - 5 years' | '5 - 10 years' | '10+ years';
            collegeStudent: boolean;
            dream: string;
            currentRole: string;
            areaOfInterest: string[];
        };
        learning_path: LearningPath;
    };
};`;
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBfydMVeTuKMaIF2DekcUE9hGrYkGXj3A0",
        method: "post",
        data: {
          contents: [{ parts: [{ text: currentQuestion }] }],
        },
      });

      const result = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!result) {
        throw new Error("No text found in response");
      }

      const jsonString = result.replace("```json\n", "").replace("\n```", "");
      let roadmapJson = JSON.parse(jsonString);
      console.log(roadmapJson);
    } catch (error) {
      console.error("Error in findRoadMap:", error);
    }
  };


  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call to analyze career path
    try {
      // In a real app, this would be an API call to your backend
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Store in localStorage for demo purposes
      localStorage.setItem("quizData", JSON.stringify(formData));

      // Redirect to results page
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error processing your quiz. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: any) => {
    switch (field.type) {
      case "input":
        return (
          <div className="space-y-2" key={field.name}>
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              id={field.name}
              placeholder={field.placeholder}
              value={formData[field.name as keyof typeof formData] as string}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
            />
          </div>
        );
      case "textarea":
        return (
          <div className="space-y-2" key={field.name}>
            <Label htmlFor={field.name}>{field.label}</Label>
            <Textarea
              id={field.name}
              placeholder={field.placeholder}
              value={formData[field.name as keyof typeof formData] as string}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              className="min-h-[120px]"
            />
          </div>
        );
      case "radio":
        return (
          <div className="space-y-2" key={field.name}>
            <Label>{field.label}</Label>
            <RadioGroup
              value={formData[field.name as keyof typeof formData] as string}
              onValueChange={(value) => handleInputChange(field.name, value)}
              className="space-y-2"
            >
              {field.options.map((option: any) => (
                <div className="flex items-center space-x-2" key={option.value}>
                  <RadioGroupItem value={option.value} id={`${field.name}-${option.value}`} />
                  <Label htmlFor={`${field.name}-${option.value}`} className="cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );
      case "checkbox":
        return (
          <div className="space-y-2" key={field.name}>
            <Label>{field.label}</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {field.options.map((option: any) => (
                <div className="flex items-center space-x-2" key={option.value}>
                  <Checkbox
                    id={`${field.name}-${option.value}`}
                    checked={(formData[field.name as keyof typeof formData] as string[]).includes(option.value)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(field.name, option.value, checked as boolean)
                    }
                  />
                  <Label htmlFor={`${field.name}-${option.value}`} className="cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-[100dvh] flex items-center justify-center p-10">
      <div className="w-3/4">
        <Button onClick={findRoadMap}>Find Roadmap</Button>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Career Path Quiz</h1>
          <p className="text-muted-foreground">
            Complete this quiz to get personalized career recommendations and a learning roadmap.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-2 text-sm">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
          </div>
          <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep].title}</CardTitle>
            <CardDescription>{steps[currentStep].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {steps[currentStep].fields.map(renderField)}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0 || isSubmitting}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={handleNext} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : currentStep === steps.length - 1 ? (
                <Button onClick={findRoadMap}>
                  Submit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}