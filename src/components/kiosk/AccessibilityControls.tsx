
"use client"

import { Button } from "@/components/ui/button"
import { Eye, Accessibility, Monitor } from "lucide-react"

interface Props {
  highContrast: boolean;
  setHighContrast: (v: boolean) => void;
  wheelchairMode: boolean;
  setWheelchairMode: (v: boolean) => void;
  isAdmin?: boolean;
}

export function AccessibilityControls({ highContrast, setHighContrast, wheelchairMode, setWheelchairMode, isAdmin }: Props) {
  return (
    <div className="flex gap-4 p-4 bg-background/80 backdrop-blur-sm border-b shadow-sm z-50">
      <Button 
        variant={highContrast ? "default" : "outline"} 
        className="kiosk-button flex-1 max-w-[300px] border-2"
        onClick={() => setHighContrast(!highContrast)}
      >
        <Eye className="mr-2 h-8 w-8" />
        {highContrast ? "Desativar Alto Contraste" : "Ativar Alto Contraste"}
      </Button>
      
      <Button 
        variant={wheelchairMode ? "default" : "outline"} 
        className="kiosk-button flex-1 max-w-[300px] border-2"
        onClick={() => setWheelchairMode(!wheelchairMode)}
      >
        <Accessibility className="mr-2 h-8 w-8" />
        {wheelchairMode ? "Desativar Modo Cadeirante" : "Ativar Modo Cadeirante"}
      </Button>

      {isAdmin && (
        <div className="ml-auto flex items-center px-4 bg-primary/10 rounded-xl text-primary font-bold">
          PAINEL ADMINISTRATIVO
        </div>
      )}
    </div>
  )
}
