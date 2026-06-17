
"use client"

import { Button } from "@/components/ui/button"
import { Eye, Accessibility, Globe } from "lucide-react"
import { Language, TranslationType } from "@/store/kiosk-store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Props {
  highContrast: boolean;
  setHighContrast: (v: boolean) => void;
  wheelchairMode: boolean;
  setWheelchairMode: (v: boolean) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isAdmin?: boolean;
  t: TranslationType;
}

export function AccessibilityControls({ 
  highContrast, 
  setHighContrast, 
  wheelchairMode, 
  setWheelchairMode, 
  language,
  setLanguage,
  isAdmin,
  t
}: Props) {
  return (
    <div className="flex gap-4 p-4 bg-background/80 backdrop-blur-sm border-b shadow-sm z-50 overflow-x-auto">
      <Button 
        variant={highContrast ? "default" : "outline"} 
        className="kiosk-button flex-1 min-w-[240px] border-2"
        onClick={() => setHighContrast(!highContrast)}
      >
        <Eye className="mr-2 h-8 w-8" />
        {highContrast ? `OFF ${t.highContrast}` : t.highContrast}
      </Button>
      
      <Button 
        variant={wheelchairMode ? "default" : "outline"} 
        className="kiosk-button flex-1 min-w-[240px] border-2"
        onClick={() => setWheelchairMode(!wheelchairMode)}
      >
        <Accessibility className="mr-2 h-8 w-8" />
        {wheelchairMode ? `OFF ${t.wheelchair}` : t.wheelchair}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="kiosk-button flex-1 min-w-[240px] border-2">
            <Globe className="mr-2 h-8 w-8" />
            {t.language}: {language.toUpperCase()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[240px] rounded-2xl p-2 border-2">
          <DropdownMenuItem onClick={() => setLanguage('pt')} className="h-16 text-xl rounded-xl cursor-pointer">
            🇧🇷 Português
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage('en')} className="h-16 text-xl rounded-xl cursor-pointer">
            🇺🇸 English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage('es')} className="h-16 text-xl rounded-xl cursor-pointer">
            🇪🇸 Español
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isAdmin && (
        <div className="ml-auto flex items-center px-6 bg-primary/10 rounded-xl text-primary font-bold whitespace-nowrap">
          {t.adminPanel}
        </div>
      )}
    </div>
  )
}
