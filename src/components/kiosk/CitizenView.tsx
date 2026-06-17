
"use client"

import { useState, useEffect } from 'react'
import { Building2, FileText, MessageSquare, Newspaper, Info, Search, Bot, ShieldCheck, Globe, TrendingUp, CloudSun, Calendar, X } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { ServiceDialog } from './ServiceDialog'
import { AIChatDialog } from './AIChatDialog'
import { NewsDialog } from './NewsDialog'
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { NewsItem, Language, TranslationType } from '@/store/kiosk-store'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ServiceItem {
  id: string;
  title: string;
  icon: any;
  description: string;
  url: string;
  steps: string[];
}

const GET_SERVICES = (t: TranslationType): ServiceItem[] => [
  { 
    id: 'iptu', 
    title: t.iptuTitle, 
    icon: Building2, 
    description: t.iptuDesc, 
    url: 'https://rioclaro.rj.gov.br/iptu',
    steps: t.iptuSteps
  },
  { 
    id: 'cert', 
    title: t.certTitle, 
    icon: FileText, 
    description: t.certDesc, 
    url: 'https://rioclaro.rj.gov.br/certidoes',
    steps: t.certSteps
  },
  { 
    id: 'ouvid', 
    title: t.ouvidTitle, 
    icon: MessageSquare, 
    description: t.ouvidDesc, 
    url: 'https://rioclaro.rj.gov.br/ouvidoria',
    steps: t.ouvidSteps
  },
  { 
    id: 'saude', 
    title: t.saudeTitle, 
    icon: Info, 
    description: t.saudeDesc, 
    url: 'https://rioclaro.rj.gov.br/saude',
    steps: t.saudeSteps
  },
  { 
    id: 'transp', 
    title: t.transpTitle, 
    icon: ShieldCheck, 
    description: t.transpDesc, 
    url: 'https://rioclaro.rj.gov.br/transparencia',
    steps: t.transpSteps
  },
  { 
    id: 'official', 
    title: t.officialTitle, 
    icon: Globe, 
    description: t.officialDesc, 
    url: 'https://rioclaro.rj.gov.br/',
    steps: t.officialSteps
  },
];

interface Props {
  wheelchairMode: boolean;
  news: NewsItem[];
  language: Language;
  t: TranslationType;
}

export function CitizenView({ wheelchairMode, news, language, t }: Props) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedNewsDetail, setSelectedNewsDetail] = useState<NewsItem | null>(null);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(false);
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
    }, 4000);
    return () => clearInterval(tickerTimer);
  }, [news]);

  const mainContainerClasses = cn(
    "flex flex-col transition-all duration-500 ease-in-out px-4 md:px-8 lg:px-12",
    wheelchairMode ? "justify-end pb-32 h-[80vh]" : "pt-8 pb-32 min-h-screen"
  );

  return (
    <div className="relative w-full h-full overflow-y-auto overflow-x-hidden">
      <div className={mainContainerClasses}>
        
        {/* Header - Hidden in wheelchair mode to save space */}
        {!wheelchairMode && (
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end border-b pb-8 gap-6 mb-10">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-primary tracking-tight leading-none">
                  {t.appName}
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium mt-2">
                  {t.tagline}
                </p>
              </div>
              <div className="hidden md:block h-20 w-px bg-border mx-4" />
              <div className="flex items-center gap-4 bg-secondary/10 px-6 py-4 rounded-3xl border border-secondary/20 shadow-sm">
                <CloudSun className="h-10 w-10 text-secondary" />
                <div>
                  <p className="text-3xl font-bold text-secondary leading-none">27°C</p>
                  <p className="text-xs font-bold text-secondary/70 uppercase tracking-widest mt-1">Rio Claro - RJ</p>
                </div>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              {currentTime && (
                <>
                  <p className="text-4xl md:text-5xl font-headline font-bold text-primary leading-none">
                    {currentTime.toLocaleTimeString(language === 'pt' ? 'pt-BR' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p className="text-lg md:text-xl font-medium text-muted-foreground mt-2">
                    {currentTime.toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {/* Search Bar - High prominence */}
        <div className="max-w-5xl mx-auto w-full mb-12">
          <div className="relative group">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 h-10 w-10 text-primary/40 group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder={t.searchPlaceholder} 
              className="h-24 pl-24 pr-8 text-2xl md:text-3xl rounded-[2rem] border-4 focus-visible:ring-primary bg-white shadow-xl hover:shadow-2xl transition-all"
              onFocus={() => setIsAiOpen(true)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-[1600px] mx-auto w-full">
          {/* Main Services Area */}
          <div className="lg:col-span-8 space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl md:text-4xl font-headline font-bold flex items-center gap-4">
                <Building2 className="h-10 w-10 text-primary" />
                {t.servicesTitle}
              </h2>
              <Button 
                onClick={() => setIsAiOpen(true)}
                className="h-20 px-10 rounded-3xl bg-secondary hover:bg-secondary/90 text-white font-bold text-xl gap-4 shadow-xl active:scale-95 transition-all"
              >
                <Bot className="h-10 w-10" />
                {t.askAi}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => (
                <Card 
                  key={service.id} 
                  className="kiosk-card min-h-[220px] flex items-center p-8 active:scale-[0.98] cursor-pointer"
                  onClick={() => setSelectedService(service)}
                >
                  <CardContent className="p-0 flex items-center gap-8 w-full">
                    <div className="p-6 bg-primary/10 rounded-3xl text-primary shrink-0">
                      <service.icon className="h-16 w-16 md:h-20 md:w-20" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-headline font-bold mb-2 leading-tight">{service.title}</h3>
                      <p className="text-lg md:text-xl text-muted-foreground line-clamp-2 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar News */}
          <div className="lg:col-span-4 space-y-10">
            <h2 className="text-3xl md:text-4xl font-headline font-bold flex items-center gap-4">
              <Newspaper className="h-10 w-10 text-primary" />
              {t.newsTitle}
            </h2>
            <div className="flex flex-col gap-6">
              {news.slice(0, 3).map((item) => (
                <Card 
                  key={item.id} 
                  className="kiosk-card overflow-hidden active:scale-[0.98] cursor-pointer"
                  onClick={() => setSelectedNewsDetail(item)}
                >
                  <div className="flex h-[180px]">
                    <div className="w-1/3 relative">
                      <Image 
                        src={item.imageUrl} 
                        alt={item.title} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div className="w-2/3 p-6 flex flex-col justify-center gap-2">
                      <span className="text-xs font-bold text-primary/60 uppercase tracking-widest">{item.date}</span>
                      <h4 className="text-xl md:text-2xl font-headline font-bold line-clamp-2 leading-tight">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </Card>
              ))}
              <Button 
                variant="outline" 
                className="kiosk-button w-full border-4 text-2xl h-24 mt-4"
                onClick={() => setIsNewsOpen(true)}
              >
                {t.allNews}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Bottom Ticker */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-28 bg-primary text-white flex items-center px-6 md:px-12 shadow-[0_-10px_40px_rgba(0,0,0,0.2)] z-[60] cursor-pointer active:bg-primary/90 transition-colors"
        onClick={() => news[tickerIndex] && setSelectedNewsDetail(news[tickerIndex])}
      >
        <div className="flex items-center gap-4 border-r-4 border-white/20 pr-8 mr-8 shrink-0">
          <div className="p-3 bg-white/10 rounded-2xl">
            <TrendingUp className="h-10 w-10 text-secondary" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black uppercase tracking-tighter leading-none italic">Plantão</span>
            <span className="text-sm font-bold opacity-70 uppercase tracking-widest">Rio Claro - RJ</span>
          </div>
        </div>
        <div className="flex-1 overflow-hidden relative h-12">
          {news.map((item, idx) => (
            <div 
              key={item.id}
              className={cn(
                "absolute inset-0 flex items-center transition-all duration-1000 ease-in-out",
                idx === tickerIndex ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              )}
            >
              <span className="text-2xl md:text-3xl font-bold truncate">
                {item.title} — <span className="text-secondary font-medium italic">{item.content.substring(0, 120)}...</span>
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

      <NewsDialog 
        isOpen={isNewsOpen}
        onOpenChange={setIsNewsOpen}
        news={news}
        t={t}
      />

      {/* Detail Dialog for individual news items */}
      <Dialog open={!!selectedNewsDetail} onOpenChange={(open) => !open && setSelectedNewsDetail(null)}>
        <DialogContent className="max-w-4xl rounded-[3rem] p-0 overflow-hidden border-8 border-primary shadow-2xl">
          {selectedNewsDetail && (
            <div className="flex flex-col">
              <div className="h-80 relative">
                <Image 
                  src={selectedNewsDetail.imageUrl} 
                  alt={selectedNewsDetail.title} 
                  fill 
                  className="object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-10">
                   <div className="flex flex-col gap-2">
                      <span className="bg-secondary text-white px-4 py-1 rounded-full text-sm font-bold w-fit uppercase tracking-widest">
                        {selectedNewsDetail.date}
                      </span>
                      <DialogTitle className="text-4xl font-headline font-bold text-white leading-tight">
                        {selectedNewsDetail.title}
                      </DialogTitle>
                   </div>
                </div>
                <DialogClose asChild>
                  <Button variant="ghost" size="icon" className="absolute top-6 right-6 h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70">
                    <X className="h-8 w-8" />
                  </Button>
                </DialogClose>
              </div>
              <div className="p-10 bg-white">
                <div className="flex items-center gap-3 text-primary mb-6">
                  <Calendar className="h-6 w-6" />
                  <span className="text-xl font-bold">Publicado em: {selectedNewsDetail.date}</span>
                </div>
                <p className="text-2xl text-slate-700 leading-relaxed font-medium">
                  {selectedNewsDetail.content}
                </p>
                <div className="mt-10 p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  <p className="text-lg text-muted-foreground text-center italic">
                    Para mais informações sobre esta notícia, procure a secretaria municipal responsável ou acesse o portal oficial de Rio Claro.
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
