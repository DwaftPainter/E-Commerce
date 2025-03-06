'use client'

import { LogIn } from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import React from 'react'
import { toast } from 'sonner'

export function useRedirect(user: any, redirectTo: string, router: AppRouterInstance) {
    if (!user) {

        router.push(redirectTo)
        toast.error('You need to sign in first!', {
            icon: <LogIn size={20} />
        })

        return false
    }

    return true
}
