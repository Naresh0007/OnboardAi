"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    Sparkles,
    Mail,
    Lock,
    ArrowRight,
    Github,
    Chrome
} from "lucide-react"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulate login
        await new Promise(resolve => setTimeout(resolve, 1000))
        // Set a cookie for the simulated session
        document.cookie = "onboard_ai_simulated_auth=true; path=/; max-age=3600"
        router.push("/dashboard")
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-md relative z-10 animate-slide-up">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold gradient-text">OnboardAI</span>
                    </Link>
                </div>

                <Card className="glow">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Welcome back</CardTitle>
                        <CardDescription>Sign in to your account to continue</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <Input
                                        type="email"
                                        placeholder="you@company.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 text-sm text-slate-400">
                                    <input type="checkbox" className="rounded border-slate-700 bg-slate-800" />
                                    Remember me
                                </label>
                                <Link href="/forgot-password" className="text-sm text-violet-400 hover:text-violet-300">
                                    Forgot password?
                                </Link>
                            </div>

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    "Signing in..."
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-800" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-slate-900 px-2 text-slate-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" type="button">
                                <Chrome className="w-4 h-4" />
                                Google
                            </Button>
                            <Button variant="outline" type="button">
                                <Github className="w-4 h-4" />
                                GitHub
                            </Button>
                        </div>

                        <p className="text-center text-sm text-slate-500 mt-6">
                            Don't have an account?{" "}
                            <Link href="/signup" className="text-violet-400 hover:text-violet-300">
                                Sign up free
                            </Link>
                        </p>
                    </CardContent>
                </Card>

                <p className="text-center text-xs text-slate-600 mt-8">
                    By signing in, you agree to our{" "}
                    <Link href="/terms" className="text-slate-500 hover:text-slate-400">Terms of Service</Link>
                    {" "}and{" "}
                    <Link href="/privacy" className="text-slate-500 hover:text-slate-400">Privacy Policy</Link>
                </p>
            </div>
        </div>
    )
}
