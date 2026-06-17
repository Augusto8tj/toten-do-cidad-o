
"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Trash2, Megaphone, Newspaper, Layout, Sparkles, AlertTriangle, Database, Search, History, ShieldCheck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { generateNewsContent } from '@/ai/flows/admin-news-content-generator'
import { cn } from '@/lib/utils'

interface Props {
  news: any[];
  addNews: (n: any) => void;
  deleteNews: (id: string) => void;
  emergencyAlert: any;
  updateEmergency: (active: boolean, message: string) => void;
  screensaverItems: any[];
  addScreensaver: (item: any) => void;
}

const MOCK_AUDIT_LOGS = [
  { id: 1, date: '16/03/2024 14:30', action: 'Publicação', detail: 'Notícia: Calendário de Eventos 2024 liberado', user: 'Admin-RC' },
  { id: 2, date: '15/03/2024 10:15', action: 'Emergência', detail: 'Alerta Ativado: Rio Claro em alerta de tempestade', user: 'Defesa Civil' },
  { id: 3, date: '14/03/2024 16:45', action: 'Configuração', detail: 'Novo slide adicionado: Festão do Peão 2024', user: 'Turismo-RC' },
  { id: 4, date: '13/03/2024 09:00', action: 'Sistema', detail: 'Atualização V1.2.5 - Otimização de Resposta IA', user: 'TI Municipal' },
  { id: 5, date: '12/03/2024 11:20', action: 'Publicação', detail: 'Notícia: Mutirão de Saúde no distrito de Passa Três', user: 'Saúde-RC' },
  { id: 6, date: '11/03/2024 15:30', action: 'Segurança', detail: 'Acesso Administrativo detectado: Unidade Centro-Sul', user: 'Segurança-RC' },
  { id: 7, date: '10/03/2024 08:45', action: 'Configuração', detail: 'Idioma Espanhol (ES) atualizado para V1.2', user: 'Comunicação' },
];

export function AdminView({ news, addNews, deleteNews, emergencyAlert, updateEmergency, screensaverItems, addScreensaver }: Props) {
  const { toast } = useToast();
  const [newNews, setNewNews] = useState({ title: '', content: '', imageUrl: '' });
  const [newSlide, setNewSlide] = useState({ imageUrl: '', caption: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [auditSearch, setAuditSearch] = useState('');

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, []);

  const handleAddNews = () => {
    if (!newNews.title || !newNews.content) {
      toast({ title: "Erro", description: "Título e conteúdo são obrigatórios." });
      return;
    }
    addNews(newNews);
    setNewNews({ title: '', content: '', imageUrl: '' });
    toast({ title: "Sucesso", description: "Notícia publicada com sucesso!" });
  };

  const handleAddSlide = () => {
    if (!newSlide.imageUrl) return;
    addScreensaver(newSlide);
    setNewSlide({ imageUrl: '', caption: '' });
    toast({ title: "Sucesso", description: "Slide adicionado ao Screensaver." });
  };

  const handleAiOptimize = async () => {
    if (!newNews.content) return;
    setIsGenerating(true);
    try {
      const result = await generateNewsContent({ articleContent: newNews.content });
      setNewNews({ ...newNews, title: result.headline, content: result.summary });
      toast({ title: "AI Otimizada", description: "Título e resumo gerados para o totem de Rio Claro." });
    } catch (e) {
      toast({ title: "Erro AI", description: "Não foi possível gerar conteúdo via AI." });
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredLogs = MOCK_AUDIT_LOGS.filter(log => 
    log.action.toLowerCase().includes(auditSearch.toLowerCase()) || 
    log.detail.toLowerCase().includes(auditSearch.toLowerCase()) ||
    log.user.toLowerCase().includes(auditSearch.toLowerCase())
  );

  return (
    <div className="p-12 h-screen bg-slate-50 flex flex-col gap-8 overflow-y-auto">
      <div className="flex justify-between items-center bg-white p-8 rounded-[2rem] shadow-sm border">
        <div>
          <h2 className="text-4xl font-headline font-bold text-primary">Painel Rio Claro - RJ</h2>
          <p className="text-xl text-muted-foreground">Gerencie o conteúdo do Link do Cidadão Rio Claro em tempo real.</p>
        </div>
        <div className="flex items-center gap-6 bg-red-50 p-6 rounded-3xl border-2 border-red-100">
           <div className="flex items-center gap-3">
              <Megaphone className="h-8 w-8 text-red-600" />
              <div className="flex flex-col">
                <Label className="text-xl font-bold text-red-900">Alerta Rio Claro</Label>
                <p className="text-sm text-red-700">Ativa a barra de emergência.</p>
              </div>
           </div>
           <Switch 
             checked={emergencyAlert.active} 
             onCheckedChange={(v) => updateEmergency(v, emergencyAlert.message)}
             className="scale-150 data-[state=checked]:bg-red-600"
           />
        </div>
      </div>

      <Tabs defaultValue="news" className="space-y-8">
        <TabsList className="h-20 bg-white border p-2 rounded-2xl w-full justify-start gap-4">
          <TabsTrigger value="news" className="h-full px-8 text-xl font-bold data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl">
            <Newspaper className="mr-2" /> Notícias
          </TabsTrigger>
          <TabsTrigger value="screensaver" className="h-full px-8 text-xl font-bold data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl">
            <Layout className="mr-2" /> Screensaver
          </TabsTrigger>
          <TabsTrigger value="settings" className="h-full px-8 text-xl font-bold data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl">
             <AlertTriangle className="mr-2" /> Emergência
          </TabsTrigger>
          <TabsTrigger value="system" className="h-full px-8 text-xl font-bold data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl">
             <ShieldCheck className="mr-2" /> Auditoria
          </TabsTrigger>
        </TabsList>

        <TabsContent value="news" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="rounded-[2rem] border-2">
            <CardHeader className="p-8">
              <CardTitle className="text-3xl font-headline">Nova Notícia</CardTitle>
              <CardDescription className="text-lg">Preencha os dados para exibir no totem de Rio Claro.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
              <div className="space-y-2">
                <Label className="text-xl font-bold">Título da Notícia</Label>
                <Input 
                  placeholder="Ex: Mutirão de Saúde em Rio Claro" 
                  value={newNews.title}
                  onChange={e => setNewNews({...newNews, title: e.target.value})}
                  className="h-16 text-xl rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-xl font-bold">Conteúdo do Artigo</Label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-primary font-bold"
                    onClick={handleAiOptimize}
                    disabled={isGenerating}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    {isGenerating ? "Gerando..." : "Otimizar via AI"}
                  </Button>
                </div>
                <Textarea 
                  placeholder="Escreva aqui o conteúdo completo..." 
                  className="min-h-[200px] text-xl rounded-xl"
                  value={newNews.content}
                  onChange={e => setNewNews({...newNews, content: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xl font-bold">URL da Imagem</Label>
                <Input 
                  placeholder="https://exemplo.com/imagem.jpg" 
                  value={newNews.imageUrl}
                  onChange={e => setNewNews({...newNews, imageUrl: e.target.value})}
                  className="h-16 text-xl rounded-xl"
                />
              </div>
              <Button onClick={handleAddNews} className="kiosk-button w-full text-2xl h-20">
                <Plus className="mr-2 h-8 w-8" /> Publicar Notícia
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-2">
             <CardHeader className="p-8">
                <CardTitle className="text-3xl font-headline">Feed Rio Claro</CardTitle>
                <CardDescription className="text-lg">Notícias em exibição no momento.</CardDescription>
             </CardHeader>
             <CardContent className="p-0">
                <ScrollArea className="h-[600px] p-8 pt-0">
                   <div className="space-y-4">
                      {news.map(n => (
                        <div key={n.id} className="flex items-center justify-between p-6 bg-slate-50 border rounded-2xl">
                          <div className="flex gap-4 items-center">
                            <div className="w-16 h-16 bg-slate-200 rounded-lg overflow-hidden relative">
                               <Image src={n.imageUrl} alt={n.title} fill className="object-cover" />
                            </div>
                            <div>
                               <h4 className="font-bold text-xl line-clamp-1">{n.title}</h4>
                               <p className="text-sm text-muted-foreground">{n.date}</p>
                            </div>
                          </div>
                          <Button 
                            variant="destructive" 
                            size="icon" 
                            className="h-12 w-12 rounded-xl"
                            onClick={() => deleteNews(n.id)}
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      ))}
                   </div>
                </ScrollArea>
             </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="screensaver">
           <Card className="rounded-[2rem] border-2">
              <CardHeader className="p-8">
                 <CardTitle className="text-3xl font-headline">Gerenciar Screensaver</CardTitle>
                 <CardDescription className="text-lg">Imagens de Rio Claro para quando o totem está ocioso.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <div className="space-y-2">
                          <Label className="text-xl font-bold">Imagem (URL)</Label>
                          <Input 
                            value={newSlide.imageUrl}
                            onChange={e => setNewSlide({...newSlide, imageUrl: e.target.value})}
                            placeholder="URL da imagem em alta resolução" 
                            className="h-16 text-xl rounded-xl"
                          />
                       </div>
                       <div className="space-y-2">
                          <Label className="text-xl font-bold">Legenda</Label>
                          <Input 
                            value={newSlide.caption}
                            onChange={e => setNewSlide({...newSlide, caption: e.target.value})}
                            placeholder="Frase chamativa para Rio Claro" 
                            className="h-16 text-xl rounded-xl"
                          />
                       </div>
                       <Button onClick={handleAddSlide} className="kiosk-button w-full h-20 text-2xl">Adicionar Slide</Button>
                    </div>
                    <div className="bg-slate-50 border rounded-2xl p-6">
                       <h4 className="text-xl font-bold mb-4">Slides Ativos</h4>
                       <div className="grid grid-cols-2 gap-4">
                          {screensaverItems.map(item => (
                            <div key={item.id} className="aspect-video bg-slate-200 rounded-xl relative overflow-hidden group">
                               <Image src={item.imageUrl} alt="Slide" fill className="object-cover" />
                               <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button variant="destructive" size="icon" className="h-10 w-10"><Trash2/></Button>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="settings">
           <Card className="rounded-[2rem] border-2 border-red-200">
              <CardHeader className="p-8 bg-red-50 rounded-t-[2rem]">
                 <CardTitle className="text-3xl font-headline text-red-900 flex items-center gap-4">
                    <AlertTriangle className="h-10 w-10" />
                    Emergência Rio Claro
                 </CardTitle>
                 <CardDescription className="text-lg text-red-700">Este aviso será exibido em todos os totens do município.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                 <div className="space-y-2">
                    <Label className="text-xl font-bold">Mensagem do Alerta</Label>
                    <Input 
                      value={emergencyAlert.message}
                      onChange={e => updateEmergency(emergencyAlert.active, e.target.value)}
                      placeholder="Ex: Rio Claro em alerta de tempestade. Procure abrigo." 
                      className="h-20 text-2xl rounded-xl border-2 border-red-100 focus-visible:ring-red-500"
                    />
                 </div>
                 <div className="flex items-center gap-4 p-8 bg-red-50 border-2 border-red-100 rounded-3xl">
                    <Switch 
                      checked={emergencyAlert.active} 
                      onCheckedChange={(v) => updateEmergency(v, emergencyAlert.message)}
                      className="scale-150"
                    />
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-red-900">Transmitir Alerta Agora</span>
                      <p className="text-red-700">O alerta começará a piscar em todos os terminais de Rio Claro.</p>
                    </div>
                 </div>
              </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="system">
           <Card className="rounded-[2rem] border-2 border-slate-200 overflow-hidden">
              <CardHeader className="p-8 bg-slate-50 border-b">
                 <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-3xl font-headline flex items-center gap-4">
                            <ShieldCheck className="h-10 w-10 text-primary" />
                            Auditoria do Sistema
                        </CardTitle>
                        <CardDescription className="text-lg">Histórico completo de ações, notícias e lançamentos no totem.</CardDescription>
                    </div>
                    <div className="relative w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                        <Input 
                            placeholder="Pesquisar histórico..." 
                            className="h-14 pl-12 text-lg rounded-xl border-2"
                            value={auditSearch}
                            onChange={(e) => setAuditSearch(e.target.value)}
                        />
                    </div>
                 </div>
              </CardHeader>
              <CardContent className="p-0">
                 <ScrollArea className="h-[500px]">
                    <div className="p-8">
                        <div className="grid grid-cols-1 gap-4">
                            {filteredLogs.length > 0 ? filteredLogs.map(log => (
                                <div key={log.id} className="p-6 bg-white border-2 rounded-2xl flex items-center gap-6 hover:border-primary/30 transition-colors">
                                    <div className={cn(
                                        "p-4 rounded-xl",
                                        log.action === 'Emergência' ? "bg-red-100 text-red-600" :
                                        log.action === 'Publicação' ? "bg-blue-100 text-blue-600" :
                                        log.action === 'Sistema' ? "bg-slate-100 text-slate-600" : "bg-emerald-100 text-emerald-600"
                                    )}>
                                        {log.action === 'Emergência' ? <Megaphone className="h-8 w-8" /> :
                                         log.action === 'Publicação' ? <Newspaper className="h-8 w-8" /> :
                                         log.action === 'Sistema' ? <Database className="h-8 w-8" /> : <History className="h-8 w-8" />}
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-bold text-xl text-slate-900">{log.action}</span>
                                            <span className="text-sm font-mono text-muted-foreground bg-slate-50 px-3 py-1 rounded-full border">{log.date}</span>
                                        </div>
                                        <p className="text-lg text-slate-600 mb-2">{log.detail}</p>
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-primary" />
                                            <span className="text-xs font-bold uppercase tracking-widest text-primary/60">Responsável: {log.user}</span>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed">
                                    <Search className="h-16 w-16 mx-auto text-slate-300 mb-4" />
                                    <p className="text-2xl font-bold text-slate-400">Nenhum registro encontrado para "{auditSearch}"</p>
                                </div>
                            )}
                        </div>
                    </div>
                 </ScrollArea>
                 
                 <div className="p-8 bg-slate-50 border-t-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-6 border-2 rounded-2xl bg-white space-y-4">
                            <h5 className="font-bold text-xl flex items-center gap-2">
                                <Database className="h-6 w-6 text-primary" /> Status da Unidade
                            </h5>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-muted-foreground">ID da Unidade</span>
                                <span className="font-mono text-primary font-bold">#RC-001-CENTRO</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-muted-foreground">Localização</span>
                                <span className="font-bold">Rio Claro - RJ</span>
                            </div>
                        </div>
                        <div className="p-6 border-2 rounded-2xl bg-white space-y-4">
                            <h5 className="font-bold text-xl flex items-center gap-2">
                                <History className="h-6 w-6 text-primary" /> Sincronização
                            </h5>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-muted-foreground">Última Auditoria</span>
                                <span>Hoje, {currentTime || '--:--'}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-muted-foreground">Modo de Registro</span>
                                <span className="text-green-600 font-bold uppercase text-sm flex items-center gap-1">
                                    <ShieldCheck className="h-4 w-4" /> Ativo & Protegido
                                </span>
                            </div>
                        </div>
                    </div>
                 </div>
              </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
