"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const API_Base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5150';

export async function getClientSession() {
    const session = (await cookies()).get("client_session")?.value
    return session ? JSON.parse(session) : null
}

export async function getClientTasks(clientId: string) {
    try {
        // Fetch client details including onboardings
        const res = await fetch(`${API_Base}/api/clients/${clientId}`, { cache: 'no-store' });
        if (!res.ok) return null;

        const client = await res.json();
        const onboarding = client.onboardings?.[0]; // Get latest onboarding

        if (!onboarding) return null;

        // Fetch onboarding details (stages/tasks)
        // Ideally we'd have a specific endpoint, but for MVP we might need to fetch the template 
        // or the specific onboarding structure if we copied it.
        // Assuming the onboarding object has the structure or we fetch it.

        // MVP Hack: We need an endpoint to get the specific onboarding details with tasks.
        // Let's assume we can fetch: /api/onboardings/{id}
        const onboardingRes = await fetch(`${API_Base}/api/onboardings/${onboarding.id}`, { cache: 'no-store' });
        if (!onboardingRes.ok) return null;

        return await onboardingRes.json();
    } catch (error) {
        console.error("Failed to fetch client tasks", error);
        return null;
    }
}
