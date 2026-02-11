"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"

const API_Base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5150';

export async function createClient(formData: {
    name: string;
    email: string;
    website?: string;
    industry?: string;
    companySize?: string;
}) {
    try {
        const res = await fetch(`${API_Base}/api/clients`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (!res.ok) {
            console.error(await res.text());
            throw new Error("Failed to create client");
        }

        revalidatePath("/dashboard/clients")
        revalidatePath("/dashboard")

        return await res.json();
    } catch (error) {
        console.error("Failed to create client:", error)
        throw error
    }
}

export async function getClients() {
    return await prisma.client.findMany({
        include: {
            onboardings: {
                orderBy: {
                    createdAt: 'desc'
                },
                take: 1
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}
