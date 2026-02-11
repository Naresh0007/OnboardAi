"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { login } from "@/app/actions/auth"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function LoginPage() {
    const searchParams = useSearchParams()
    const registered = searchParams.get("registered")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (formData: FormData) => {
        setLoading(true)
        setError("")
        const res = await login(formData)
        if (res?.error) {
            setError(res.error)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
            <Card className="w-full max-w-md border-slate-800 bg-slate-900/50 backdrop-blur-xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-white">Client Login</CardTitle>
                    <CardDescription>
                        Access your onboarding dashboard.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {registered && (
                        <div className="mb-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm text-center">
                            Account created successfully! Please log in.
                        </div>
                    )}

                    <form action={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Email</label>
                            <Input name="email" type="email" placeholder="you@company.com" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Password</label>
                            <Input name="password" type="password" required />
                        </div>

                        {error && <p className="text-sm text-red-400 text-center">{error}</p>}

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Sign In
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
