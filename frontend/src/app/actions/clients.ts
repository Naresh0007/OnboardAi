"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"

export async function createClient(formData: {
    name: string;
    email: string;
    website?: string;
    industry?: string;
    companySize?: string;
}) {
    // Get the first tenant as a fallback for the demo
    const tenant = await prisma.tenant.findFirst()

    if (!tenant) {
        throw new Error("No tenant found. Please seed the database.")
    }

    const client = await prisma.client.create({
        data: {
            name: formData.name,
            email: formData.email,
            website: formData.website,
            industry: formData.industry,
            companySize: formData.companySize,
            tenantId: tenant.id,
        }
    })

    // Create a default onboarding for the client
    await prisma.onboarding.create({
        data: {
            clientId: client.id,
            templateId: 'default-onboarding-template',
            status: "IN_PROGRESS",
        }
    })

    revalidatePath("/dashboard/clients")
    revalidatePath("/dashboard")

    return client
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
