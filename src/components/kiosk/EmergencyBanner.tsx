
"use client"

import { AlertTriangle } from "lucide-react"

interface Props {
  active: boolean;
  message: string;
  t: any;
}

export function EmergencyBanner({ active, message, t }: Props) {
  if (!active) return null;

  return (
    <div className="w-full animate-emergency-flash py-6 px-8 flex items-center justify-center gap-4 text-white z-[100] shadow-2xl">
      <AlertTriangle className="h-10 w-10 animate-pulse" />
      <span className="text-3xl font-black uppercase tracking-widest font-headline text-center">
        {t.emergency}: {message}
      </span>
      <AlertTriangle className="h-10 w-10 animate-pulse" />
    </div>
  )
}
