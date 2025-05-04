// app/providers.tsx
'use client'

import {HeroUIProvider} from '@heroui/react'
import * as React from "react";

export function Providers({children}) {
    return (
        <HeroUIProvider>
            {children}
        </HeroUIProvider>
    )
}