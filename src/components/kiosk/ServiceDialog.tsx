
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { QrCode, ExternalLink, Printer, MapPin, CheckCircle2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TranslationType } from "@/store/kiosk-store"

interface Props {
  isOpen: boolean;
  onOpenChange: (v: boolean) => void;
  service: {
    title: string;
    description: string;
    url: string;
    steps?: string[];
  } | null;
  t: TranslationType;
}

export function ServiceDialog({ isOpen, onOpenChange, service, t }: Props) {
  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl rounded-[3rem] p-0 gap-0 border-8 border-primary overflow-hidden shadow-2xl">
        <DialogHeader className="p-10 bg-primary text-white space-y-2 relative">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-5xl font-headline font-bold mb-2">
              {service.title}
            </DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full bg-white/10 hover:bg-white/20 text-white">
                <X className="h-8 w-8" />
              </Button>
            </DialogClose>
          </div>
          <DialogDescription className="text-2xl text-primary-foreground/90 font-medium">
            {service.description}
          </DialogDescription>
        </DialogHeader>

        <div className="p-12 bg-white flex flex-col lg:flex-row gap-12">
          {/* Main Info */}
          <div className="flex-1 space-y-10">
            {/* Steps Section */}
            <div className="space-y-6">
              <h4 className="text-3xl font-headline font-bold text-slate-800 flex items-center gap-3">
                <CheckCircle2 className="h-8 w-8 text-secondary" />
                {t.steps}
              </h4>
              <div className="space-y-4">
                {service.steps?.map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start p-6 bg-slate-50 rounded-2xl border-2 border-slate-100">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold text-xl">
                      {idx + 1}
                    </span>
                    <p className="text-2xl font-medium text-slate-700 leading-tight">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Section */}
            <div className="p-8 bg-secondary/10 rounded-3xl border-2 border-secondary/20 space-y-2">
              <div className="flex items-center gap-3 text-secondary">
                <MapPin className="h-8 w-8" />
                <h5 className="text-2xl font-bold uppercase tracking-wider">{t.locationLabel}</h5>
              </div>
              <p className="text-2xl font-bold text-slate-800">
                {t.mainOffice}
              </p>
            </div>
          </div>
          
          {/* Action Panel */}
          <div className="w-full lg:w-[380px] space-y-8 flex flex-col">
            <div className="p-8 bg-slate-50 rounded-[2rem] border-4 border-dashed border-slate-200 flex flex-col items-center gap-6 shadow-inner">
              <div className="bg-white p-4 rounded-3xl shadow-lg">
                <div className="w-56 h-56 bg-slate-900 rounded-2xl flex items-center justify-center p-4">
                  <QrCode className="w-full h-full text-white" />
                </div>
              </div>
              <p className="text-xl font-bold text-center text-slate-600 leading-snug">
                {t.seeDetails}
              </p>
              <span className="font-mono text-xs text-slate-400">#CITY-HALL-SYNC-RC</span>
            </div>

            <div className="flex flex-col gap-4">
              <Button size="lg" className="h-24 rounded-3xl bg-primary hover:bg-primary/90 text-2xl font-bold gap-4 shadow-xl active:scale-95 transition-all">
                <Printer className="h-8 w-8" />
                {t.printTicket}
              </Button>
              <Button size="lg" variant="outline" className="h-24 rounded-3xl border-4 text-2xl font-bold gap-4 shadow-xl active:scale-95 transition-all">
                <ExternalLink className="h-8 w-8" />
                {t.officialTitle}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
