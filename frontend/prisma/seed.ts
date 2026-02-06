import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding...')

    // Create default tenant
    const tenant = await prisma.tenant.upsert({
        where: { subdomain: 'main' },
        update: {},
        create: {
            name: 'Main Tenant',
            subdomain: 'main',
        },
    })

    console.log(`Created tenant with id: ${tenant.id}`)

    // Create default admin user
    const admin = await prisma.user.upsert({
        where: { email: 'admin@onboardai.com' },
        update: {},
        create: {
            email: 'admin@onboardai.com',
            name: 'Admin User',
            role: 'ADMIN',
            tenantId: tenant.id,
        },
    })

    // Create default onboarding template
    const template = await prisma.onboardingTemplate.upsert({
        where: { id: 'default-onboarding-template' },
        update: {},
        create: {
            id: 'default-onboarding-template',
            name: 'Standard SaaS Onboarding',
            description: 'The standard onboarding flow for SaaS clients',
            tenantId: tenant.id,
            stages: {
                create: [
                    { name: 'Kickoff', order: 1, color: '#A855F7' },
                    { name: 'Technical Setup', order: 2, color: '#3B82F6' },
                    { name: 'Compliance', order: 3, color: '#EF4444' },
                    { name: 'Training', order: 4, color: '#10B981' },
                    { name: 'Go-Live', order: 5, color: '#6366F1' },
                ]
            }
        },
    })

    console.log(`Created default template with id: ${template.id}`)

    console.log('Seeding finished.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
