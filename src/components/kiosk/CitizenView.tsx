
"use client"

import { useState, useEffect } from 'react'
import { Building2, FileText, MessageSquare, Newspaper, Info, Search, Bot, ShieldCheck, Globe, TrendingUp, CloudSun } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { ServiceDialog } from './ServiceDialog'
import { AIChatDialog } from './AIChatDialog'
import { NewsItem, Language } from '@/store/kiosk-store'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const GET_SERVICES = (t: any) => [
  { id: 'iptu', title: t.iptuTitle, icon: Building2, description: t.iptuDesc, url: 'https://rioclaro.rj.gov.br/iptu' },
  { id: 'cert', title: t.certTitle, icon: FileText, description: t.certDesc, url: 'https://rioclaro.rj.gov.br/certidoes' },
  { id: 'ouvid', title: t.ouvidTitle, icon: MessageSquare, description: t.ouvidDesc, url: 'https://rioclaro.rj.gov.br/ouvidoria' },
  { id: 'saude', title: t.saudeTitle, icon: Info, description: t.saudeDesc, url: 'https://rioclaro.rj.gov.br/saude' },
  { id: 'transp', title: t.transpTitle, icon: ShieldCheck, description: t.transpDesc, url: 'https://rioclaro.rj.gov.br/transparencia' },
  { id: 'official', title: t.officialTitle, icon: Globe, description: t.officialDesc, url: 'https://rioclaro.rj.gov.br/' },
];

interface Props {
  wheelchairMode: boolean;
  news: NewsItem[];
  language: Language;
  t: any;
}

export function CitizenView({ wheelchairMode, news, language, t }: Props) {
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [tickerIndex, setTickerIndex] = useState(0);
  const services = GET_SERVICES(t);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (news.length === 0) return;
    const tickerTimer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % news.length);
    }, 3000);
    return () => clearInterval(tickerTimer);
  }, [news]);

  const containerClasses = wheelchairMode 
    ? "h-screen flex flex-col justify-end pb-12 px-12 gap-8" 
    : "h-screen flex flex-col pt-12 px-12 gap-10 overflow-y-auto pb-32";

  return (
    <div className={cn("relative", containerClasses)}>
      {!wheelchairMode && (
        <div className="flex justify-between items-end border-b pb-8">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-6xl font-headline font-bold text-primary">{t.appName}</h1>
              <p className="text-2xl text-muted-foreground mt-2">{t.tagline}</p>
            </div>
            <div className="h-20 w-px bg-border mx-4" />
            <div className="flex items-center gap-3 bg-secondary/10 p-4 rounded-2xl border border-secondary/20">
              <CloudSun className="h-10 w-10 text-secondary" />
              <div>
                <p className="text-3xl font-bold text-secondary">27°C</p>
                <p className="text-sm font-medium text-secondary/80">Rio Claro - RJ</p>
              </div>
            </div>
          </div>
          <div className="text-right min-w-[200px]">
            {currentTime && (
              <>
                <p className="text-4xl font-headline font-bold text-primary">
                  {currentTime.toLocaleTimeString(language === 'pt' ? 'pt-BR' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-xl font-medium text-muted-foreground">
                  {currentTime.toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
                </p>
              </>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-headline font-bold flex items-center gap-3">
              <Building2 className="h-10 w-10 text-primary" />
              {t.servicesTitle}
            </h2>
            <Button 
              onClick={() => setIsAiOpen(true)}
              className="h-16 px-8 rounded-2xl bg-secondary hover:bg-secondary/90 text-white font-bold text-xl gap-3 shadow-lg transition-transform active:scale-95"
            >
              <Bot className="h-8 w-8" />
              {t.askAi}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card 
                key={service.id} 
                className="cursor-pointer border-2 hover:border-primary hover:shadow-xl transition-all h-[240px] flex items-center p-8 rounded-[2rem]"
                onClick={() => setSelectedService(service)}
              >
                <CardContent className="p-0 flex items-center gap-8 w-full">
                  <div className="p-6 bg-primary/10 rounded-3xl text-primary">
                    <service.icon className="h-20 w-20" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-headline font-bold mb-2">{service.title}</h3>
                    <p className="text-xl text-muted-foreground line-clamp-2 leading-tight">
                      {service.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="relative group mt-8">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-10 w-10 text-muted-foreground" />
            <Input 
              placeholder={t.searchPlaceholder} 
              className="h-24 pl-20 text-3xl rounded-3xl border-2 focus-visible:ring-primary bg-white shadow-sm"
              onFocus={() => setIsAiOpen(true)}
            />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-8">
          <h2 className="text-4xl font-headline font-bold flex items-center gap-3">
            <Newspaper className="h-10 w-10 text-primary" />
            {t.newsTitle}
          </h2>
          <div className="flex flex-col gap-6">
            {news.slice(0, 2).map((item) => (
              <Card key={item.id} className="overflow-hidden border-2 rounded-[2rem] hover:shadow-md transition-all">
                <div className="flex h-[160px]">
                  <div className="w-1/3 relative">
                    <Image 
                      src={item.imageUrl} 
                      alt={item.title} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div className="w-2/3 p-6 flex flex-col justify-center">
                    <span className="text-sm font-bold text-primary/60 mb-1">{item.date}</span>
                    <h4 className="text-2xl font-headline font-bold line-clamp-2 leading-tight">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </Card>
            ))}
            <Button variant="outline" className="kiosk-button w-full border-2 text-xl mt-4">
              {t.allNews}
            </Button>
          </div>
        </div>
      </div>

      <div className={cn(
        "fixed left-0 right-0 h-24 bg-primary text-white flex items-center px-12 shadow-2xl z-40 transition-all",
        wheelchairMode ? "bottom-0" : "bottom-0"
      )}>
        <div className="flex items-center gap-4 border-r-2 border-white/20 pr-8 mr-8 shrink-0">
          <TrendingUp className="h-10 w-10 text-secondary" />
          <span className="text-2xl font-black uppercase tracking-tighter">Plantão Rio Claro</span>
        </div>
        <div className="flex-1 overflow-hidden relative h-10">
          {news.map((item, idx) => (
            <div 
              key={item.id}
              className={cn(
                "absolute inset-0 flex items-center transition-all duration-700 ease-in-out",
                idx === tickerIndex ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}
            >
              <span className="text-2xl font-bold truncate">
                {item.title} — <span className="text-secondary font-medium">{item.content.substring(0, 100)}...</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <ServiceDialog 
        isOpen={!!selectedService} 
        onOpenChange={() => setSelectedService(null)} 
        service={selectedService}
        t={t}
      />

      <AIChatDialog 
        isOpen={isAiOpen}
        onOpenChange={setIsAiOpen}
        language={language}
        t={t}
      />
    </div>
  )
}
