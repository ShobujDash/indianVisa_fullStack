"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const { user, setIsLoggedin } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState("login");

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      router.push("/add-document");
    }
  }, [user, router]);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const onLogin = async (e) => {
    console.log(loginData);
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("/user/login", loginData);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setIsLoggedin(true);
        router.push("/add-document");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("/user/register", signupData);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setIsLoggedin(true);
        router.push("/add-document");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[400px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-center">Authentication</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" onValueChange={(value) => setTab(value)}>
            <TabsList className="w-full flex justify-center">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Signup</TabsTrigger>
            </TabsList>

            {/* LOGIN */}
            <TabsContent value="login">
              <form onSubmit={onLogin} className="space-y-3">
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    value={loginData.email}
                    onChange={handleLoginChange}
                  />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={handleLoginChange}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </TabsContent>

            {/* SIGNUP */}
            <TabsContent value="signup">
              <form onSubmit={onRegister} className="space-y-3">
                <div>
                  <Label>Username</Label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your username"
                    value={signupData.name}
                    onChange={handleSignupChange}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    value={signupData.email}
                    onChange={handleSignupChange}
                  />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={signupData.password}
                    onChange={handleSignupChange}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "Signup"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
