"use client";

import { useState } from "react";
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
import { signIn } from "next-auth/react";

const SignUp = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setPending(false);
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setPending(false);

    if (res.ok) {
      toast.success(data.message);
      router.push("/sign-in");
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle className="text-center">Sign Up</CardTitle>
          <CardDescription className="text-center text-accent-foreground">
            Create an account to get started
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
            <Input type="text" placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <Input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <Input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            <Input type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} required />
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <Separator className="my-4" />

          <p className="text-center text-sm mt-4 text-muted-foreground">
            Already have an account?{" "}
            <Link className="text-primary hover:underline" href="/sign-in">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
