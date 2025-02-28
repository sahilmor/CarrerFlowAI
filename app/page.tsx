
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart, Book, BrainCircuit, Compass } from "lucide-react";
import { SectionHeading } from "@/components/ui-components/SectionHeading";
import Link from "next/link";
import { NavigationBar } from "@/components/ui-components/NavigationBar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Footer from "@/components/ui-components/Footer";
import ContactSection from "@/components/ui-components/ContactSection";

const LandingPage = () => {
  // const navigate = useNavigate();

  const features = [
    {
      icon: <BrainCircuit className="h-8 w-8 text-primary" />,
      title: "AI-Powered Analysis",
      description:
        "Get personalized career recommendations based on your unique skills, interests, and goals.",
    },
    {
      icon: <Compass className="h-8 w-8 text-primary" />,
      title: "Customized Learning Path",
      description:
        "Follow a tailored roadmap that guides you through the most relevant courses for your career goals.",
    },
    {
      icon: <Book className="h-8 w-8 text-primary" />,
      title: "Curated Resources",
      description:
        "Access high-quality learning materials from top educational platforms, carefully selected for your needs.",
    },
    {
      icon: <BarChart className="h-8 w-8 text-primary" />,
      title: "Progress Tracking",
      description:
        "Monitor your learning journey with detailed progress tracking and milestone achievements.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <NavigationBar />
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-20 md:py-32 animate-fade-down">
        <div className="container max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6">
            Discover Your Ideal{" "}
            <span className="text-primary">Career Path</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Our AI-powered platform analyzes your skills and interests to create a
            personalized learning roadmap that guides you to your dream career.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/quiz">
              <Button className="group">
                Start Career Quiz{" "}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button>
                
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button>
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container max-w-6xl mx-auto px-4">

          <div className="flex gap-4 justify-center items-center">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{feature.icon}</CardTitle>
                  <CardDescription>{feature.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  {feature.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-purple-500/10">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <SectionHeading title="Ready to Start Your Journey?">
            <p className="text-lg text-muted-foreground mb-8">
              Take the first step toward your ideal career by discovering your
              personalized learning path today.
            </p>
          </SectionHeading>
          <Link href="/quiz">
            <Button className="group">
              Begin Career Assessment{" "}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>
      <ContactSection />

     <Footer />
    </div>
  );
};

export default LandingPage;
