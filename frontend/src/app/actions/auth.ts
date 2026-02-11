"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const API_Base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5150';

export async function acceptInvite(token: string, formData: FormData) {
    const name = formData.get("name") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (password !== confirmPassword) {
        return { error: "Passwords do not match" }
    }

    try {
        const res = await fetch(`${API_Base}/api/auth/accept-invite`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, name, password })
        });

        if (!res.ok) {
            return { error: await res.text() }
        }

        const data = await res.json()

        // Auto login by setting cookie (MVP style)
        // In real app, we would get a JWT from login endpoint
        // For now, redirect to login to force clean auth flow

    } catch (error) {
        return { error: "Failed to accept invite" }
    }

    redirect("/login?registered=true")
}

export async function login(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
        const res = await fetch(`${API_Base}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
            return { error: "Invalid email or password" }
        }

        const user = await res.json()

        // Set session cookie
        cookies().set("client_session", JSON.stringify(user), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7 // 1 week
        })

    } catch (error) {
        return { error: "Login failed" }
    }

    redirect("/portal")
}

export async function logout() {
    cookies().delete("client_session")
    redirect("/login")
}

export async function getClientSession() {
    const session = cookies().get("client_session")?.value
    return session ? JSON.parse(session) : null
}
