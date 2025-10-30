"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MagicCard } from "@/components/ui/magic-card";

import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import userLogin from "@/utility/login";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


import { UserRole } from "@/types/role";
import checkAuthStatus from "@/utility/checkAuthStatus";

// ✅ Zod Schema — Centralized Validation
const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ Initialize React Hook Form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ✅ Submit handler
  const onSubmit = async (data: LoginFormValues) => {
    console.log("✅ Login data:", data);
    setLoading(true);
    try {
      const res = await userLogin(data);
      if (!res.success) {
        toast.error("Login failed");
      } else {
        const authenticatedData = await checkAuthStatus();
        if (authenticatedData.authenticated && authenticatedData.user) {
          const { role } = authenticatedData.user;
          switch (role) {
            case UserRole.ADMIN:
              router.push("/dashboard");
              break;
            case UserRole.DOCTOR:
              router.push("/dashboard/doctor");
              break;
            case UserRole.PATIENT:
              router.push("/dashboard/patient");
              break;
            default:
              router.push("/");
              break;
          }
        } else {
          toast.error("Authentication failed")
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm border-none p-0 shadow-none">
      <MagicCard
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        className="p-0"
      >
        {/* Header */}
        <CardHeader className=" p-4  text-center">
          <CardTitle className="text-primary text-2xl">
            PH Health Care
          </CardTitle>
          <CardDescription className="sr-only">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        {/* Form Content */}
        <CardContent className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email">Email</Label>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field with Toggle */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <FormControl>
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="********"
                          {...field}
                          className="pr-10"
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>

        {/* Footer */}
        <CardFooter className="p-4 ">
          <div className="flex justify-center w-full">
            <Link
              href="/"
              className="underline text-center text-sm text-foreground p-2"
            >
              Back to home
            </Link>
          </div>
        </CardFooter>
      </MagicCard>
    </Card>
  );
}
