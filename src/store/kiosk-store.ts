
"use client"

import { useState, useEffect } from 'react'

export type Language = 'pt' | 'en' | 'es';

export type NewsItem = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  date: string;
}

export type ScreensaverItem = {
  id: string;
  imageUrl: string;
  caption?: string;
}

const DEFAULT_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Calendário de Eventos 2024 liberado',
    content: 'Prepare-se para as festas tradicionais de Rio Claro! Festa da União e Festa da Paz confirmadas para este semestre.',
    imageUrl: 'https://picsum.photos/seed/calendar/800/600',
    date: 'Hoje'
  },
  {
    id: '2',
    title: 'Inscrições para a Corte do Festão do Peão',
    content: 'Estão abertas as inscrições para Rainha e Princesas do Festão do Peão Boiadeiro de Rio Claro.',
    imageUrl: 'https://picsum.photos/seed/peao-news/800/600',
    date: 'Ontem'
  },
  {
    id: '3',
    title: 'Mutirão de Saúde no Centro',
    content: 'Neste sábado, atendimento especial para consultas e vacinação na Praça da Matriz.',
    imageUrl: 'https://picsum.photos/seed/health/800/600',
    date: '05 Mar'
  }
];

const DEFAULT_SCREENSAVER: ScreensaverItem[] = [
  { 
    id: 's1', 
    imageUrl: 'https://picsum.photos/seed/uniao/1920/1080', 
    caption: 'Festa da União 2024 - De 12 a 15 de Julho! Gastronomia, shows regionais e cultura.' 
  },
  { 
    id: 's2', 
    imageUrl: 'https://picsum.photos/seed/paz/1920/1080', 
    caption: 'Festa da Paz: Um momento de harmonia e lazer para toda a família em Rio Claro.' 
  },
  { 
    id: 's3', 
    imageUrl: 'https://picsum.photos/seed/peao/1920/1080', 
    caption: 'Festão do Peão Boiadeiro - O maior rodeio da região está chegando! Prepare sua bota.' 
  },
  { 
    id: 's4', 
    imageUrl: 'https://picsum.photos/seed/city1/1920/1080', 
    caption: 'Bem-vindo a Rio Claro - RJ! Estamos trabalhando para você.' 
  }
];

export const translations = {
  pt: {
    appName: "Link do Cidadão",
    tagline: "Rio Claro - RJ | Portal de Serviços e Informação",
    servicesTitle: "Serviços Rio Claro",
    newsTitle: "Notícias Locais",
    touchToStart: "Toque na tela para começar",
    accessibility: "Acessibilidade",
    highContrast: "Alto Contraste",
    wheelchair: "Modo Cadeirante",
    searchPlaceholder: "Pesquisar serviços em Rio Claro...",
    allNews: "Ver Todas as Notícias",
    adminPanel: "Painel Administrativo",
    unit: "Unidade",
    language: "Idioma",
    emergency: "ALERTA DE EMERGÊNCIA",
    aiAssistantTitle: "Assistente Rio Claro",
    aiAssistantSubtitle: "Inteligência Artificial da Prefeitura",
    aiGreeting: "Como posso ajudar você hoje em Rio Claro?",
    aiSuggestions: ['Como pagar IPTU?', 'Onde tem vacinação?', 'Horário da Prefeitura', 'Telefone Ouvidoria'],
    aiInputPlaceholder: "Digite sua dúvida aqui...",
    iptuTitle: "IPTU",
    iptuDesc: "Emita a 2ª via do seu IPTU de Rio Claro.",
    certTitle: "Certidões",
    certDesc: "Certidões negativas e documentos municipais.",
    ouvidTitle: "Ouvidoria",
    ouvidDesc: "Fale com a Prefeitura: sugestões ou reclamações.",
    saudeTitle: "Agendamento Saúde",
    saudeDesc: "Marque consultas nas unidades de Rio Claro.",
    transpTitle: "Transparência",
    transpDesc: "Acompanhe a gestão dos recursos públicos municipais.",
    officialTitle: "Site Oficial",
    officialDesc: "Acesse o portal completo da Prefeitura de Rio Claro.",
    askAi: "Perguntar à IA",
    errorAi: "Desculpe, tive um problema ao processar sua dúvida. Tente novamente."
  },
  en: {
    appName: "Citizen Link",
    tagline: "Rio Claro - RJ | Service & Information Portal",
    servicesTitle: "Rio Claro Services",
    newsTitle: "Local News",
    touchToStart: "Touch the screen to start",
    accessibility: "Accessibility",
    highContrast: "High Contrast",
    wheelchair: "Wheelchair Mode",
    searchPlaceholder: "Search services in Rio Claro...",
    allNews: "View All News",
    adminPanel: "Admin Panel",
    unit: "Unit",
    language: "Language",
    emergency: "EMERGENCY ALERT",
    aiAssistantTitle: "Rio Claro Assistant",
    aiAssistantSubtitle: "City Hall Artificial Intelligence",
    aiGreeting: "How can I help you today in Rio Claro?",
    aiSuggestions: ['How to pay IPTU?', 'Where is vaccination?', 'City Hall Hours', 'Ombudsman Phone'],
    aiInputPlaceholder: "Type your question here...",
    iptuTitle: "Property Tax (IPTU)",
    iptuDesc: "Issue a duplicate of your property tax.",
    certTitle: "Certificates",
    certDesc: "Negative certificates and city documents.",
    ouvidTitle: "Ombudsman",
    ouvidDesc: "Talk to City Hall: suggestions or complaints.",
    saudeTitle: "Health Booking",
    saudeDesc: "Book appointments in Rio Claro units.",
    transpTitle: "Transparency",
    transpDesc: "Monitor the management of municipal public resources.",
    officialTitle: "Official Website",
    officialDesc: "Access the full portal of Rio Claro City Hall.",
    askAi: "Ask AI",
    errorAi: "Sorry, I had trouble processing your question. Try again soon."
  },
  es: {
    appName: "Enlace del Ciudadano",
    tagline: "Rio Claro - RJ | Portal de Servicios e Información",
    servicesTitle: "Servicios de Rio Claro",
    newsTitle: "Noticias Locales",
    touchToStart: "Toque la pantalla para comenzar",
    accessibility: "Accesibilidad",
    highContrast: "Alto Contraste",
    wheelchair: "Modo Silla de Ruedas",
    searchPlaceholder: "Buscar servicios en Rio Claro...",
    allNews: "Ver Todas as Noticias",
    adminPanel: "Panel Administrativo",
    unit: "Unidad",
    language: "Idioma",
    emergency: "ALERTA DE EMERGENCIA",
    aiAssistantTitle: "Asistente Rio Claro",
    aiAssistantSubtitle: "Inteligencia Artificial de la Alcaldía",
    aiGreeting: "¿Cómo posso ayudarte hoy en Rio Claro?",
    aiSuggestions: ['¿Cómo pagar IPTU?', '¿Dónde hay vacunación?', 'Horario de Alcaldía', 'Teléfono Defensoría'],
    aiInputPlaceholder: "Escriba sua duda aquí...",
    iptuTitle: "Impuesto (IPTU)",
    iptuDesc: "Emita el duplicado de su impuesto predial.",
    certTitle: "Certificados",
    certDesc: "Certificados negativos y documentos municipales.",
    ouvidTitle: "Defensoría",
    ouvidDesc: "Hable con la Alcaldía: sugerencias o quejas.",
    saudeTitle: "Citas Médicas",
    saudeDesc: "Reserve citas en las unidades de Rio Claro.",
    transpTitle: "Transparencia",
    transpDesc: "Monitorear la gestión de los recursos públicos municipales.",
    officialTitle: "Sitio Oficial",
    officialDesc: "Acceda al portal completo de la Alcaldía de Rio Claro.",
    askAi: "Preguntar a la IA",
    errorAi: "Lo siento, tuve un problema al procesar su consulta. Inténtelo de nuevo."
  }
};

export function useKioskStore() {
  const [language, setLanguage] = useState<Language>('pt');
  const [highContrast, setHighContrast] = useState(false);
  const [wheelchairMode, setWheelchairMode] = useState(false);
  const [emergencyAlert, setEmergencyAlert] = useState({ active: false, message: '' });
  const [news, setNews] = useState<NewsItem[]>([]);
  const [screensaverItems, setScreensaverItems] = useState<ScreensaverItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedNews = localStorage.getItem('civitas_news');
    const storedScreensaver = localStorage.getItem('civitas_screensaver');
    const storedEmergency = localStorage.getItem('civitas_emergency');
    const storedLang = localStorage.getItem('civitas_lang');

    if (storedLang) setLanguage(storedLang as Language);
    setNews(storedNews ? JSON.parse(storedNews) : DEFAULT_NEWS);
    setScreensaverItems(storedScreensaver ? JSON.parse(storedScreensaver) : DEFAULT_SCREENSAVER);
    setEmergencyAlert(storedEmergency ? JSON.parse(storedEmergency) : { active: false, message: '' });
    setIsInitialized(true);
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('civitas_lang', lang);
  };

  const addNews = (item: Omit<NewsItem, 'id' | 'date'>) => {
    const newItem = { ...item, id: Math.random().toString(36).substr(2, 9), date: new Date().toLocaleDateString('pt-BR') };
    const updated = [newItem, ...news];
    setNews(updated);
    localStorage.setItem('civitas_news', JSON.stringify(updated));
  };

  const addScreensaver = (item: Omit<ScreensaverItem, 'id'>) => {
    const newItem = { ...item, id: Math.random().toString(36).substr(2, 9) };
    const updated = [newItem, ...screensaverItems];
    setScreensaverItems(updated);
    localStorage.setItem('civitas_screensaver', JSON.stringify(updated));
  };

  const updateEmergency = (active: boolean, message: string) => {
    const update = { active, message };
    setEmergencyAlert(update);
    localStorage.setItem('civitas_emergency', JSON.stringify(update));
  };

  const deleteNews = (id: string) => {
    const updated = news.filter(n => n.id !== id);
    setNews(updated);
    localStorage.setItem('civitas_news', JSON.stringify(updated));
  };

  const t = translations[language];

  return {
    language, changeLanguage,
    highContrast, setHighContrast,
    wheelchairMode, setWheelchairMode,
    emergencyAlert, updateEmergency,
    news, addNews, deleteNews,
    screensaverItems, addScreensaver,
    isInitialized, t
  };
}
