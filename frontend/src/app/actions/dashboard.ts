"use server"

export interface DashboardStats {
    activeOnboardings: { value: string; change: string; trend: string };
    completedThisMonth: { value: string; change: string; trend: string };
    avgTimeToComplete: { value: string; change: string; trend: string };
    atRisk: { value: string; change: string; trend: string };
}

export interface RecentOnboarding {
    id: string;
    client: string;
    email: string;
    status: string;
    progress: number;
    riskLevel: string;
    daysRemaining: number;
    stage: string;
}

const API_Base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5150';

export async function getDashboardStats(): Promise<DashboardStats | null> {
    try {
        // Use a short timeout to not block UI if API is down
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const res = await fetch(`${API_Base}/api/dashboard/stats`, {
            cache: 'no-store',
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!res.ok) {
            console.error(`Status: ${res.status}`);
            return null;
        }
        return res.json();
    } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
        return null;
    }
}

export async function getRecentOnboardings(): Promise<RecentOnboarding[]> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const res = await fetch(`${API_Base}/api/dashboard/recent`, {
            cache: 'no-store',
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!res.ok) return [];
        return res.json();
    } catch (error) {
        console.error("Failed to fetch recent onboardings:", error);
        return [];
    }
}
