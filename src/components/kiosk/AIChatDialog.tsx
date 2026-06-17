
"use client"

import { useState, useRef, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, User, Loader2, X } from "lucide-react"
import { citizenAIServiceAssistant } from '@/ai/flows/citizen-ai-service-assistant'
import { Language } from '@/store/kiosk-store'
import { cn } from '@/lib/utils'

interface Message {
  role: 'user' | 'assistant';
  content: string;
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
  const scrollRef = useRef<HTMLDivElement>(null);

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

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0 rounded-[2rem] overflow-hidden border-4 border-primary">
        <DialogHeader className="p-8 bg-primary text-white flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl">
              <Bot className="h-10 w-10 text-white" />
            </div>
            <div>
              <DialogTitle className="text-3xl font-headline font-bold">{t.aiAssistantTitle}</DialogTitle>
              <p className="text-primary-foreground/80 text-lg">{t.aiAssistantSubtitle}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 flex flex-col bg-slate-50 relative">
          <ScrollArea className="flex-1 p-8" ref={scrollRef}>
            <div className="space-y-6 max-w-3xl mx-auto">
              {messages.length === 0 && (
                <div className="text-center py-12 space-y-4">
                  <Bot className="h-16 w-16 mx-auto text-primary/30" />
                  <p className="text-2xl text-muted-foreground font-medium">
                    {t.aiGreeting}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    {t.aiSuggestions.map((q: string) => (
                      <Button 
                        key={q} 
                        variant="outline" 
                        className="h-16 rounded-xl text-lg border-2 hover:border-primary whitespace-normal text-left"
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
                  "flex gap-4 items-start",
                  m.role === 'user' ? "flex-row-reverse" : "flex-row"
                )}>
                  <div className={cn(
                    "p-3 rounded-2xl shrink-0",
                    m.role === 'user' ? "bg-primary text-white" : "bg-white border-2 text-slate-800"
                  )}>
                    {m.role === 'user' ? <User className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
                  </div>
                  <div className={cn(
                    "max-w-[80%] p-6 rounded-3xl text-xl leading-relaxed shadow-sm",
                    m.role === 'user' ? "bg-primary text-white rounded-tr-none" : "bg-white border-2 rounded-tl-none"
                  )}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-white border-2 rounded-2xl">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                  <div className="bg-white border-2 p-6 rounded-3xl rounded-tl-none shadow-sm">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-8 bg-white border-t-2">
            <div className="max-w-3xl mx-auto flex gap-4">
              <Input 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                placeholder={t.aiInputPlaceholder}
                className="h-20 text-2xl rounded-2xl px-8 border-2 focus-visible:ring-primary flex-1"
              />
              <Button 
                onClick={() => handleSend()}
                disabled={isLoading}
                className="h-20 w-24 rounded-2xl"
              >
                <Send className="h-10 w-10" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
