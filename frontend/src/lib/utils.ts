import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(date))
}

export function formatRelativeTime(date: Date | string): string {
    const now = new Date()
    const then = new Date(date)
    const diffMs = now.getTime() - then.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return formatDate(date)
}

export function getInitials(name: string): string {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

export function calculateProgress(completed: number, total: number): number {
    if (total === 0) return 0
    return Math.round((completed / total) * 100)
}

export function getRiskColor(level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'): string {
    const colors = {
        LOW: 'text-emerald-500',
        MEDIUM: 'text-amber-500',
        HIGH: 'text-orange-500',
        CRITICAL: 'text-red-500',
    }
    return colors[level]
}

export function getRiskBgColor(level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'): string {
    const colors = {
        LOW: 'bg-emerald-500/10',
        MEDIUM: 'bg-amber-500/10',
        HIGH: 'bg-orange-500/10',
        CRITICAL: 'bg-red-500/10',
    }
    return colors[level]
}
