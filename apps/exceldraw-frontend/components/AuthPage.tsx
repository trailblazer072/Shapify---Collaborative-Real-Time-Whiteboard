"use client";

import type React from "react";

import { Button } from "@repo/ui/button";
import Input from "@repo/ui/input";
import { useState } from "react";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  const url = process.env.NEXT_PUBLIC_HTTP_BACKEND as string;

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error,setError]= useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
     let response;
    try {
     
      if (isSignin) {
      response = await axios.post(`${url}/signin`, formData);
      localStorage.setItem("token", response?.data.token);
      router.push("/dashboard");
    }else{
        response = await axios.post(`${url}/signup`, formData);
      localStorage.setItem("token", response?.data.token);
      router.push("/dashboard");
    }
    } catch (error:any) {
      
      setError(error?.response.data.message as string)
  
      
    }

    setIsLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card/50" />

      {/* Main auth container */}
      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">
            {isSignin ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-muted-foreground text-balance">
            {isSignin
              ? "Sign in to your account to continue"
              : "Sign up to get started with your account"}
          </p>
        </div>

        {/* Auth form card */}
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username field */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-foreground block"
              >
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                  className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 hover:border-ring/50"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground block"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="pl-10 pr-10 bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 hover:border-ring/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot password link for sign in */}
            {isSignin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  {isSignin ? "Signing in..." : "Creating account..."}
                </div>
              ) : isSignin ? (
                "Sign in"
              ) : (
                "Create account"
              )}
            </Button>
            {error && <p className="text-red-500">{error}</p>}
          </form>

          {/* Switch between sign in/up */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              {isSignin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                onClick={
                  isSignin
                    ? () => {
                        router.push("/signup");
                      }
                    : () => {
                        router.push("/signin");
                      }
                }
              >
                {isSignin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
