"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { TriangleAlert } from "lucide-react";
import axios from "axios";
import { useAtom, useSetAtom } from "jotai";
import { roadmapDataAtom } from "@/recoil/atom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const setRoadmaps = useSetAtom(roadmapDataAtom);

   const fetchRoadmaps = async () => {
    try {
      const { data } = await axios.get("/api/roadmap");
      if (data?.roadmaps?.length) {
        setRoadmaps(data.roadmaps);
        console.log("✅ Roadmaps received:", data.roadmaps);
      } else {
        setError("No roadmaps found.");
      }
    } catch (error) {
      setError("Failed to fetch roadmaps.");
    } finally {
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    const res = await signIn("credentials", { redirect: false, email, password });

    if (res?.ok) {
      toast.success("Login successful");
      fetchRoadmaps();
      setTimeout(() => {
        router.push("/roadmap");
      }, 3000);
    } else {
      setError("Invalid credentials");
      setPending(false);
    }
  };

  const handleProviderSignIn = async (provider: "github" | "google") => {
    await signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle className="text-center">Sign In</CardTitle>
          <CardDescription className="text-center text-accent-foreground">
            Use email or a service to sign in
          </CardDescription>
        </CardHeader>
        {error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center text-sm text-destructive mb-6">
            <TriangleAlert className="mr-2" />
            <p>{error}</p>
          </div>
        )}
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Signing in..." : "Continue"}
            </Button>
          </form>

          <Separator className="my-4" />

          <div className="flex justify-center space-x-4">
            <Button onClick={() => handleProviderSignIn("google")} variant="outline">
              <FcGoogle className="text-xl" />
            </Button>
            <Button onClick={() => handleProviderSignIn("github")} variant="outline">
              <FaGithub className="text-xl" />
            </Button>
          </div>

          <p className="text-center text-sm mt-4 text-muted-foreground">
            Don't have an account?{" "}
            <Link className="text-primary hover:underline" href="/sign-up">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
