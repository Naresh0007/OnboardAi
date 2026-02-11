"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { acceptInvite } from "@/app/actions/auth"
import { useState, Suspense } from "react"
import { Loader2 } from "lucide-react"

function InviteForm() {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
                <Card className="w-[400px] border-red-500/50 bg-slate-900/50">
                    <CardHeader>
                        <CardTitle className="text-red-400">Invalid Invite</CardTitle>
                        <CardDescription>No invitation token was found.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }

    const handleSubmit = async (formData: FormData) => {
        setLoading(true)
        setError("")
        const res = await acceptInvite(token, formData)
        if (res?.error) {
            setError(res.error)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
            <Card className="w-full max-w-md border-violet-500/30 bg-slate-900/50 backdrop-blur-xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-indigo-500" />
                <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center mb-4">
                        <span className="text-2xl">✨</span>
                    </div>
                    <CardTitle className="text-2xl text-white">Welcome</CardTitle>
                    <CardDescription>
                        Set up your account to access the onboarding portal.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Full Name</label>
                            <Input name="name" placeholder="John Doe" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Set Password</label>
                            <Input name="password" type="password" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Confirm Password</label>
                            <Input name="confirmPassword" type="password" required />
                        </div>

                        {error && <p className="text-sm text-red-400 text-center">{error}</p>}

                        <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700" disabled={loading}>
                            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Create Account
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default function InvitePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
                <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
            </div>
        }>
            <InviteForm />
        </Suspense>
    )
}
