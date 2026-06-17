
"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Trash2, Megaphone, Newspaper, Layout, Sparkles, AlertTriangle, Database, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { generateNewsContent } from '@/ai/flows/admin-news-content-generator'

interface Props {
  news: any[];
  addNews: (n: any) => void;
  deleteNews: (id: string) => void;
  emergencyAlert: any;
  updateEmergency: (active: boolean, message: string) => void;
  screensaverItems: any[];
  addScreensaver: (item: any) => void;
}

export function AdminView({ news, addNews, deleteNews, emergencyAlert, updateEmergency, screensaverItems, addScreensaver }: Props) {
  const { toast } = useToast();
  const [newNews, setNewNews] = useState({ title: '', content: '', imageUrl: '' });
  const [newSlide, setNewSlide] = useState({ imageUrl: '', caption: '' });
  const [isGenerating, setIsGenerating] = useState(false);

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

  return (
    <div className="p-12 h-screen bg-slate-50 flex flex-col gap-8 overflow-y-auto">
      <div className="flex justify-between items-center bg-white p-8 rounded-[2rem] shadow-sm border">
        <div>
          <h2 className="text-4xl font-headline font-bold text-primary">Painel Rio Claro - RJ</h2>
          <p className="text-xl text-muted-foreground">Gerencie o conteúdo do Civitas Link Rio Claro em tempo real.</p>
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
             <Database className="mr-2" /> Sistema
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
           <Card className="rounded-[2rem] border-2 border-slate-200">
              <CardHeader className="p-8">
                 <CardTitle className="text-3xl font-headline flex items-center gap-4">
                    <Database className="h-10 w-10 text-primary" />
                    Configurações do Sistema
                 </CardTitle>
                 <CardDescription className="text-lg">Registro oficial de Rio Claro - RJ e auditoria.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                 <div className="p-8 bg-slate-50 border-2 border-dashed rounded-[2rem] flex flex-col gap-6">
                    <div className="space-y-2">
                      <h4 className="text-2xl font-bold text-slate-800">Repositório de Registros</h4>
                      <p className="text-lg text-muted-foreground">Utilizado para auditoria e logs de operação do Civitas Link Rio Claro.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center justify-between">
                       <code className="text-lg font-mono text-primary break-all">https://github.com/Augusto8tj/toten-do-cidad-o.git</code>
                       <Button asChild variant="outline" className="h-14 px-8 text-lg border-2">
                          <a href="https://github.com/Augusto8tj/toten-do-cidad-o.git" target="_blank" rel="noopener noreferrer">
                             <ExternalLink className="mr-2 h-6 w-6" /> Abrir GitHub
                          </a>
                       </Button>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 border rounded-2xl bg-white space-y-4">
                       <h5 className="font-bold text-xl">Status da Unidade</h5>
                       <div className="flex justify-between items-center py-2 border-b">
                          <span className="text-muted-foreground">ID da Unidade</span>
                          <span className="font-mono">#RC-001-CENTRO</span>
                       </div>
                       <div className="flex justify-between items-center py-2 border-b">
                          <span className="text-muted-foreground">Localização</span>
                          <span className="font-bold">Rio Claro - RJ</span>
                       </div>
                    </div>
                    <div className="p-6 border rounded-2xl bg-white space-y-4">
                       <h5 className="font-bold text-xl">Sincronização</h5>
                       <div className="flex justify-between items-center py-2 border-b">
                          <span className="text-muted-foreground">Última Atualização</span>
                          <span>Hoje, {new Date().toLocaleTimeString()}</span>
                       </div>
                       <div className="flex justify-between items-center py-2 border-b">
                          <span className="text-muted-foreground">Servidor</span>
                          <span className="text-green-600 font-bold">CONECTADO</span>
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
