import { CourseProps } from "@/components/ui-components/CourseCard";

export interface RoadmapStepData {
    step: number;
    title: string;
    description: string;
    skills: string[];
    completed: boolean;
    course: CourseProps;
  }

  export const mockRoadmap: RoadmapStepData[] = [
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