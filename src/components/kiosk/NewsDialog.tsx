
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { NewsItem, TranslationType } from "@/store/kiosk-store"
import { Newspaper, X, Calendar } from "lucide-react"
import Image from "next/image"

interface Props {
  isOpen: boolean;
  onOpenChange: (v: boolean) => void;
  news: NewsItem[];
  t: TranslationType;
}

export function NewsDialog({ isOpen, onOpenChange, news, t }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] h-[85vh] flex flex-col p-0 rounded-[3rem] overflow-hidden border-8 border-primary shadow-2xl">
        <DialogHeader className="p-8 bg-primary text-white flex-row items-center justify-between space-y-0 relative shrink-0">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-white/20 rounded-2xl">
              <Newspaper className="h-12 w-12 text-white" />
            </div>
            <div>
              <DialogTitle className="text-4xl font-headline font-bold">{t.newsTitle}</DialogTitle>
              <p className="text-primary-foreground/80 text-xl">Fique por dentro do que acontece em Rio Claro</p>
            </div>
          </div>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full bg-white/10 hover:bg-white/20 text-white">
              <X className="h-8 w-8" />
            </Button>
          </DialogClose>
        </DialogHeader>

        <ScrollArea className="flex-1 p-8 bg-slate-50">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
            {news.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-[2rem] overflow-hidden border-2 border-slate-100 shadow-md hover:shadow-xl transition-all group flex flex-col h-full"
              >
                <div className="h-64 relative overflow-hidden">
                  <Image 
                    src={item.imageUrl} 
                    alt={item.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-primary/90 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 backdrop-blur-sm">
                    <Calendar className="h-4 w-4" />
                    {item.date}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1 gap-4">
                  <h3 className="text-2xl font-headline font-bold text-slate-900 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xl text-muted-foreground leading-relaxed flex-1">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
