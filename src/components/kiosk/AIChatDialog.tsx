"use client"

import { useState, useRef, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, User, Loader2, Volume2, VolumeX, X } from "lucide-react"
import { citizenAIServiceAssistant } from '@/ai/flows/citizen-ai-service-assistant'
import { textToSpeech } from '@/ai/flows/text-to-speech-flow'
import { Language } from '@/store/kiosk-store'
import { cn } from '@/lib/utils'

interface Message {
  role: 'user' | 'assistant';
  content: string;
  audioUrl?: string;
}

interface Props {
  isOpen: boolean;
  onOpenChange: (v: boolean) => void;
  language: Language;
  t: any;
}

export function AIChatDialog({ isOpen, onOpenChange, language, t }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
    }
  }, [messages]);

  const handleSend = async (customInput?: string) => {
    const textToSend = customInput || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg = textToSend.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await citizenAIServiceAssistant({
        question: userMsg,
        language: language
      });
      
      setMessages(prev => [...prev, { role: 'assistant', content: response.answer }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: t.errorAi }]);
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = async (text: string, index: number) => {
    if (isSpeaking === index) {
      audioRef.current?.pause();
      setIsSpeaking(null);
      return;
    }

    setIsSpeaking(index);
    try {
      const { audioUri } = await textToSpeech({ text });
      if (audioRef.current) {
        audioRef.current.src = audioUri;
        audioRef.current.play();
        audioRef.current.onended = () => setIsSpeaking(null);
      }
    } catch (error) {
      console.error("TTS Error:", error);
      setIsSpeaking(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] lg:max-w-4xl h-[85vh] flex flex-col p-0 rounded-[3rem] overflow-hidden border-8 border-primary shadow-2xl transition-all duration-300">
        <audio ref={audioRef} hidden />
        <DialogHeader className="p-6 md:p-10 bg-primary text-white flex-row items-center justify-between space-y-0 relative">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-white/20 rounded-[1.5rem] shadow-inner">
              <Bot className="h-12 w-12 text-white" />
            </div>
            <div>
              <DialogTitle className="text-3xl md:text-4xl font-headline font-bold">{t.aiAssistantTitle}</DialogTitle>
              <p className="text-primary-foreground/80 text-xl font-medium">{t.aiAssistantSubtitle}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onOpenChange(false)}
            className="absolute top-6 right-6 h-14 w-14 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <X className="h-8 w-8" />
          </Button>
        </DialogHeader>

        <div className="flex-1 flex flex-col bg-slate-50 relative">
          <ScrollArea className="flex-1 p-6 md:p-10" ref={scrollRef}>
            <div className="space-y-8 max-w-3xl mx-auto pb-10">
              {messages.length === 0 && (
                <div className="text-center py-16 space-y-8">
                  <div className="w-32 h-32 bg-primary/5 rounded-[2.5rem] flex items-center justify-center mx-auto animate-pulse">
                    <Bot className="h-20 w-20 text-primary/30" />
                  </div>
                  <p className="text-3xl text-slate-800 font-bold max-w-md mx-auto leading-tight">
                    {t.aiGreeting}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
                    {t.aiSuggestions.map((q: string) => (
                      <Button 
                        key={q} 
                        variant="outline" 
                        className="h-24 rounded-2xl text-xl border-4 hover:border-primary hover:bg-primary/5 whitespace-normal text-left px-8 font-bold transition-all shadow-sm"
                        onClick={() => handleSend(q)}
                      >
                        {q}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              {messages.map((m, i) => (
                <div key={i} className={cn(
                  "flex gap-6 items-start animate-in slide-in-from-bottom-4 duration-300",
                  m.role === 'user' ? "flex-row-reverse" : "flex-row"
                )}>
                  <div className={cn(
                    "p-4 rounded-2xl shrink-0 shadow-md",
                    m.role === 'user' ? "bg-primary text-white" : "bg-white border-2 text-slate-800"
                  )}>
                    {m.role === 'user' ? <User className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
                  </div>
                  <div className={cn(
                    "max-w-[85%] p-8 rounded-[2rem] text-2xl leading-relaxed shadow-lg relative group transition-all",
                    m.role === 'user' 
                      ? "bg-primary text-white rounded-tr-none" 
                      : "bg-white border-2 border-slate-100 rounded-tl-none text-slate-800"
                  )}>
                    {m.content}
                    {m.role === 'assistant' && (
                      <Button
                        variant="default"
                        size="icon"
                        className="absolute -right-16 top-0 h-14 w-14 rounded-2xl shadow-xl active:scale-90"
                        onClick={() => playAudio(m.content, i)}
                      >
                        {isSpeaking === i ? <VolumeX className="h-8 w-8" /> : <Volume2 className="h-8 w-8" />}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-6 items-start animate-pulse">
                  <div className="p-4 bg-white border-2 rounded-2xl">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                  <div className="bg-white border-2 p-8 rounded-[2rem] rounded-tl-none shadow-md">
                    <div className="flex gap-3">
                      <div className="w-3 h-3 bg-primary/40 rounded-full animate-bounce" />
                      <div className="w-3 h-3 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-3 h-3 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-8 md:p-12 bg-white border-t-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
            <div className="max-w-3xl mx-auto flex gap-6">
              <Input 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                placeholder={t.aiInputPlaceholder}
                className="h-24 text-2xl md:text-3xl rounded-[1.5rem] px-10 border-4 focus-visible:ring-primary flex-1 shadow-inner bg-slate-50"
              />
              <Button 
                onClick={() => handleSend()}
                disabled={isLoading}
                className="h-24 w-28 rounded-[1.5rem] shadow-xl active:scale-95 transition-all"
              >
                <Send className="h-12 w-12" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}