"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import Link from "next/link";
import axios from "axios";
import { quizFormAtom } from "@/recoil/atom";

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
import { NavigationBar } from "@/components/ui-components/NavigationBar";
import Footer from "@/components/ui-components/Footer";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;




const defaultQuizForm = {
  name: "",
  email: "",
  currentRole: "",
  yearsExperience: "",
  educationLevel: "",
  skills: [],
  interests: [],
  careerGoals: ""
};

export default function QuizPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [quizForm, setQuizForm] = useAtom(quizFormAtom);


  const safeQuizForm = { ...defaultQuizForm, ...quizForm };

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  type QuizStep = {
    title: string;
    description: string;
    fields: any[];
  };
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
          name: "educationLevel",
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
          "name": "skills",
          "label": "Technical Skills",
          "type": "checkbox",
          "options": [

            { "value": "artificial-intelligence", "label": "Artificial Intelligence (AI)" },
            { "value": "machine-learning", "label": "Machine Learning (ML)" },
            { "value": "deep-learning", "label": "Deep Learning" },
            { "value": "cloud-computing", "label": "Cloud Computing (AWS, Azure, GCP)" },
            { "value": "devops", "label": "DevOps (CI/CD, Kubernetes, Docker)" },
            { "value": "cybersecurity", "label": "Cybersecurity (Ethical Hacking, Penetration Testing)" },
            { "value": "data-science", "label": "Data Science (Statistics, Predictive Modeling)" },
            { "value": "data-analysis", "label": "Data Analysis (SQL, Python, R)" },
            { "value": "blockchain", "label": "Blockchain Development (Solidity, Web3)" },
            { "value": "internet-of-things", "label": "Internet of Things (IoT)" },
            { "value": "edge-computing", "label": "Edge Computing" },
            { "value": "quantum-computing", "label": "Quantum Computing" },
            { "value": "generative-ai", "label": "Generative AI (GANs, Transformers)" },
            { "value": "natural-language-processing", "label": "Natural Language Processing (NLP)" },
            { "value": "computer-vision", "label": "Computer Vision" },
            { "value": "big-data", "label": "Big Data (Hadoop, Spark)" },
            { "value": "automation", "label": "Automation (RPA, Scripting)" },
            { "value": "full-stack-development", "label": "Full-Stack Development (MERN, MEAN)" },
            { "value": "mobile-development", "label": "Mobile Development (React Native, Flutter)" },
            { "value": "ui/ux-design", "label": "UI/UX Design" },
            { "value": "product-management", "label": "Product Management" },
            { "value": "entrepreneurship", "label": "Entrepreneurship" },

            { "value": "html", "label": "HTML" },
            { "value": "css", "label": "CSS" },
            { "value": "javascript", "label": "JavaScript" },
            { "value": "python", "label": "Python (Beginner)" },
            { "value": "sql", "label": "SQL (Beginner)" },
            { "value": "git", "label": "Git/Version Control" },
            { "value": "basic-networking", "label": "Basic Networking" },
            { "value": "office-suite", "label": "Office Suite (Word, Excel, PowerPoint)" },
            { "value": "project-management-basics", "label": "Project Management Basics" }
          ],
          "required": true
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
      ],
    },
  ];
  const handleInputChange = (field: string, value: string) => {
    setQuizForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    setQuizForm((prev: any) => {
      const currentArray = Array.isArray(prev[field]) ? prev[field] : [];
      if (checked) {
        return { ...prev, [field]: [...currentArray, value] };
      } else {
        return { ...prev, [field]: currentArray.filter((item: any) => item !== value) };
      }
    });
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNext = () => {
    const currentFields = steps[currentStep].fields;
    let isValid = true;

    for (const field of currentFields) {
      const value = safeQuizForm[field.name as keyof typeof safeQuizForm]; if (field.required && (!value || (Array.isArray(value) && value.length === 0))) {
        isValid = false;
        toast({
          title: "Missing information",
          description: `Please fill in the ${field.label} field.`,
          variant: "destructive",
        });
        break;
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const currentQuestion = `You are an experienced career counselor and roadmap planner, helping students and early-career developers shape their learning paths to become industry-ready. Below is the profile of a user in JSON format. Based on this, generate a step-by-step learning roadmap that guides the user from their current stage to their dream role. 
      The output should be strictly in JSON format with clear sections for each phase of the roadmap (Beginner, Intermediate, Advanced) along with estimated timelines, recommended one best course on the whole internet along with its link and the skills that  will be enhanced by user after comleting the course, and key projects to build at each step.
      User Profile (JSON):
      ${JSON.stringify(quizForm)}
  
      below i have the data type of the roadmap in JSON format strictly follow this format:
      type Course = {
          platform: string;
          name: string;
          link: string;
          focus: string;
          skills: string[];
          description : string;
      };
  
      type Project = {
          name: string;
          description: string;
      };
  
      type Step = {
          title: string;
          description: string;
          courses: Course;
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
                  experience: string;
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
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
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
    //@ts-ignore
    const fieldValue = safeQuizForm[field.name];
    switch (field.type) {
      case "input":
        return (
          <div key={field.name}>
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              id={field.name}
              value={fieldValue}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={field.placeholder}
            />
          </div>
        );

      case "textarea":
        return (
          <div key={field.name}>
            <Label htmlFor={field.name}>{field.label}</Label>
            <Textarea
              id={field.name}
              value={fieldValue}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={field.placeholder}
            />
          </div>
        );
      case "radio":
        return (
          <div key={field.name}>
            <Label>{field.label}</Label>
            <RadioGroup value={fieldValue} onValueChange={(value) => handleInputChange(field.name, value)}>
              {field.options.map((option: any) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`${field.name}-${option.value}`} />
                  <Label htmlFor={`${field.name}-${option.value}`}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );
      case "checkbox":
        return (
          <div key={field.name}>
            <Label>{field.label}</Label>
            <div className="grid grid-cols-2 gap-2">
              {field.options.map((option: any) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${field.name}-${option.value}`}
                    checked={fieldValue.includes(option.value)}
                    onCheckedChange={(checked: any) =>
                      handleCheckboxChange(field.name, option.value, !!checked)
                    }
                  />
                  <Label htmlFor={`${field.name}-${option.value}`}>{option.label}</Label>
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
    <>
      <NavigationBar />
      <div className="w-full h-[90dvh] flex items-center justify-center p-10">
        <div className="w-3/4">
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
                  <>
                    Submit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
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
      <Footer />
    </>
  );
}
