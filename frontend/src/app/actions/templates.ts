"use server"

const API_Base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5150';

export interface TaskTemplate {
    title: string;
    type: number;
    isRequired: boolean;
    order: number;
}

export interface StageTemplate {
    name: string;
    description: string;
    order: number;
    tasks: TaskTemplate[];
}

export interface OnboardingTemplate {
    id?: string;
    name: string;
    description: string;
    industryType: string;
    isActive: boolean;
    stages: StageTemplate[];
}

export async function getTemplates(): Promise<OnboardingTemplate[]> {
    try {
        const res = await fetch(`${API_Base}/api/templates`, { cache: 'no-store' });
        if (!res.ok) return [];
        return res.json();
    } catch (error) {
        console.error("Failed to fetch templates:", error);
        return [];
    }
}

export async function generateTemplate(prompt: string): Promise<OnboardingTemplate | null> {
    try {
        const res = await fetch(`${API_Base}/api/templates/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });
        
        if (!res.ok) {
            console.error(await res.text());
            return null;
        }
        return res.json();
    } catch (error) {
        console.error("Failed to generate template:", error);
        return null;
    }
}

export async function saveTemplate(template: OnboardingTemplate): Promise<boolean> {
    try {
        const res = await fetch(`${API_Base}/api/templates`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(template)
        });
        return res.ok;
    } catch (error) {
        console.error("Failed to save template:", error);
        return false;
    }
}
