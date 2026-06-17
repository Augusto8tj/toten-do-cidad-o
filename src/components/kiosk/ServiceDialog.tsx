
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { QrCode, ExternalLink, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  isOpen: boolean;
  onOpenChange: (v: boolean) => void;
  service: {
    title: string;
    description: string;
    url: string;
  } | null;
}

export function ServiceDialog({ isOpen, onOpenChange, service }: Props) {
  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl rounded-[2rem] p-12 gap-8 border-4 border-primary">
        <DialogHeader>
          <DialogTitle className="text-4xl font-headline font-bold text-primary mb-2">
            {service.title}
          </DialogTitle>
          <DialogDescription className="text-2xl leading-relaxed">
            {service.description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-12 items-center justify-between">
          <div className="flex flex-col gap-6 flex-1">
            <p className="text-xl font-medium text-muted-foreground">
              Para continuar no seu celular, aponte a câmera para o QR Code ao lado:
            </p>
            <div className="flex flex-col gap-4">
              <Button size="lg" className="kiosk-button w-full text-xl h-20">
                <Printer className="mr-3 h-8 w-8" />
                Imprimir Senha
              </Button>
              <Button size="lg" variant="outline" className="kiosk-button w-full text-xl h-20 border-2">
                <ExternalLink className="mr-3 h-8 w-8" />
                Ver Requisitos
              </Button>
            </div>
          </div>
          
          <div className="p-8 bg-white rounded-3xl border-2 border-slate-100 shadow-inner flex flex-col items-center gap-4">
             {/* Mock QR Code representation */}
            <div className="w-64 h-64 bg-slate-900 rounded-xl flex items-center justify-center p-4">
               <QrCode className="w-full h-full text-white" />
            </div>
            <span className="font-mono text-sm text-slate-400">#CITY-HALL-PORTAL-SYNC</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
