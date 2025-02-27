"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Rocket, Loader2, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/auth-provider";


const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({
    email: false,
    google: false,
    linkedin: false,
  });

  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  
  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading((prev) => ({ ...prev, email: true }));

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      login(data.user); 
      router.push("/dashboard"); 
    } catch (error) {
      console.error("Login error:", error);
       
    } finally {
      setIsLoading((prev) => ({ ...prev, email: false }));
    }
  };

  
  const handleOAuthLogin = async (provider: string) => {
    setIsLoading((prev) => ({ ...prev, [provider]: true }));

    
    await new Promise((resolve) => setTimeout(resolve, 1500));

    login(provider);
    setIsLoading((prev) => ({ ...prev, [provider]: false }));
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2 font-bold">
        <Rocket className="h-6 w-6 text-primary" />
        <span>CareerPath AI</span>
      </Link>

     
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">Sign in</CardTitle>
          <CardDescription>Sign in to access your personalized career roadmap</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
         
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
           
            <div>
              <label className="block text-sm font-medium">Email</label>
              <Input type="email" {...form.register("email")} placeholder="john@example.com" />
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
              )}
            </div>

           
            <div>
              <label className="block text-sm font-medium">Password</label>
              <Input type="password" {...form.register("password")} placeholder="••••••••" />
              {form.formState.errors.password && (
                <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>
              )}
            </div>

           
            <Button type="submit" className="w-full" disabled={isLoading.email}>
              {isLoading.email ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

         
          <Button
            variant="outline"
            onClick={() => handleOAuthLogin("google")}
            disabled={isLoading.google}
            className="w-full"
          >
            {isLoading.google ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign in with Google"}
          </Button>

          <Button
            variant="outline"
            onClick={() => handleOAuthLogin("linkedin")}
            disabled={isLoading.linkedin}
            className="w-full"
          >
            {isLoading.linkedin ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Linkedin className="mr-2 h-4 w-4" />}
            Sign in with LinkedIn
          </Button>

          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue as guest</span>
            </div>
          </div>

         
          <Link href="/quiz" passHref className="w-full">
            <Button variant="secondary" className="w-full">Start Career Quiz</Button>
          </Link>
        </CardContent>




        
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">Terms of Service</Link>{" "}
            and{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">Privacy Policy</Link>.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
