
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

export type EmergencyAlert = {
  active: boolean;
  message: string;
}

const DEFAULT_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Calendário de Eventos 2024 liberado',
    content: 'Prepare-se para as festas tradicionais de Rio Claro! Festa da União e Festa da Paz confirmadas para este semestre com shows nacionais e regionais.',
    imageUrl: 'https://picsum.photos/seed/calendar/800/600',
    date: 'Hoje'
  },
  {
    id: '2',
    title: 'Inscrições para a Corte do Festão do Peão',
    content: 'Estão abertas as inscrições para Rainha e Princesas do Festão do Peão Boiadeiro de Rio Claro. Participe da tradição sertaneja do nosso município.',
    imageUrl: 'https://picsum.photos/seed/peao-news/800/600',
    date: 'Hoje'
  },
  {
    id: '3',
    title: 'Modernização da RJ-155 em Rio Claro',
    content: 'As obras de pavimentação e sinalização no trecho urbano da RJ-155 avançam, garantindo mais segurança para quem trafega entre Rio Claro e Angra.',
    imageUrl: 'https://picsum.photos/seed/road/800/600',
    date: 'Ontem'
  },
  {
    id: '4',
    title: 'Apoio ao Produtor Rural em Getulândia',
    content: 'A Secretaria de Agricultura iniciou a entrega de sementes e oferece suporte técnico mecanizado para os produtores do distrito de Getulândia.',
    imageUrl: 'https://picsum.photos/seed/farm/800/600',
    date: 'Ontem'
  },
  {
    id: '5',
    title: 'Mutirão de Saúde no Centro e Passa Três',
    content: 'Neste sábado, atendimento especial para consultas e vacinação na Praça da Matriz e no distrito de Passa Três. Não esqueça o cartão do SUS.',
    imageUrl: 'https://picsum.photos/seed/health/800/600',
    date: '05 Mar'
  },
  {
    id: '6',
    title: 'Nova Iluminação LED chega a Lídice',
    content: 'A Prefeitura concluiu a instalação de novas luminárias de LED no distrito de Lídice, garantindo mais segurança e economia para a população.',
    imageUrl: 'https://picsum.photos/seed/light/800/600',
    date: '04 Mar'
  },
  {
    id: '7',
    title: 'Escolas Conectadas em Rio Claro',
    content: 'Alunos da rede municipal começam a receber tablets com conteúdo pedagógico offline para auxiliar nos estudos e inclusão digital.',
    imageUrl: 'https://picsum.photos/seed/edu/800/600',
    date: '03 Mar'
  },
  {
    id: '8',
    title: 'Preservação da Cachoeira do Salto',
    content: 'Projeto de sinalização turística e preservação ambiental é iniciado na Cachoeira do Salto para promover o turismo sustentável em Rio Claro.',
    imageUrl: 'https://picsum.photos/seed/nature/800/600',
    date: '02 Mar'
  },
  {
    id: '9',
    title: 'Novas Câmeras de Monitoramento',
    content: 'O Centro de Comando de Rio Claro agora conta com 20 novas câmeras de alta resolução cobrindo as principais entradas e saídas da cidade.',
    imageUrl: 'https://picsum.photos/seed/security/800/600',
    date: '01 Mar'
  },
  {
    id: '10',
    title: 'Feira do Produtor na Praça da Matriz',
    content: 'Venha prestigiar o melhor da nossa terra! Todos os domingos, produtos frescos e artesanato local direto dos distritos para você.',
    imageUrl: 'https://picsum.photos/seed/market/800/600',
    date: '28 Fev'
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
    iptuSteps: ["Tenha em mãos o número da inscrição imobiliária", "Confira o endereço do imóvel", "Escolha a forma de pagamento (PIX ou Boleto)"],
    certTitle: "Certidões",
    certDesc: "Certidões negativas e documentos municipais.",
    certSteps: ["Informe o CPF ou CNPJ", "Selecione o tipo de certidão (Negativa, Imóvel, etc)", "Certidão emitida na hora com código de autenticidade"],
    ouvidTitle: "Ouvidoria",
    ouvidTitleFull: "Fale com a Ouvidoria",
    ouvidDesc: "Fale com a Prefeitura: sugestões ou reclamações.",
    ouvidSteps: ["Escolha o tipo: Elogio, Reclamação ou Sugestão", "Anexe fotos se necessário (via QR Code)", "Guarde seu protocolo de atendimento"],
    saudeTitle: "Agendamento Saúde",
    saudeDesc: "Marque consultas nas unidades de Rio Claro.",
    saudeSteps: ["Apresente seu Cartão do SUS", "Escolha a unidade de saúde mais próxima", "Confirme o horário disponível na rede municipal"],
    transpTitle: "Transparência",
    transpDesc: "Acompanhe a gestão dos recursos públicos municipais.",
    transpSteps: ["Acesse receitas e despesas em tempo real", "Consulte licitações abertas no município", "Acompanhe os salários dos servidores municipais"],
    officialTitle: "Site Oficial",
    officialDesc: "Acesse o portal completo da Prefeitura de Rio Claro.",
    officialSteps: ["Portal oficial com notícias institucionais", "Links para diário oficial e editais", "Telefones e contatos de todas as secretarias"],
    askAi: "Perguntar à IA",
    errorAi: "Desculpe, tive um problema ao processar sua dúvida. Tente novamente.",
    requirements: "Requisitos Necessários",
    steps: "Passo a Passo",
    printTicket: "Imprimir Senha",
    seeDetails: "Ver Detalhes no Celular",
    locationLabel: "Localização de Atendimento",
    mainOffice: "Paço Municipal: Praça da Matriz, Centro",
    adminPasswordTitle: "Acesso Restrito",
    adminPasswordLabel: "Digite a senha administrativa para acessar o painel:",
    adminPasswordPlaceholder: "Senha de acesso...",
    adminPasswordError: "Senha incorreta! Acesso negado.",
    confirm: "Confirmar",
    cancel: "Cancelar"
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
    iptuSteps: ["Have your real estate registration number ready", "Check the property address", "Choose payment method (PIX or Bank Slip)"],
    certTitle: "Certificates",
    certDesc: "Negative certificates and city documents.",
    certSteps: ["Enter CPF or CNPJ", "Select certificate type", "Instant issuance with authenticity code"],
    ouvidTitle: "Ombudsman",
    ouvidTitleFull: "Speak with the Ombudsman",
    ouvidDesc: "Talk to City Hall: suggestions or complaints.",
    ouvidSteps: ["Select type: Praise, Complaint or Suggestion", "Attach photos if needed (via QR Code)", "Keep your ticket number"],
    saudeTitle: "Health Booking",
    saudeDesc: "Book appointments in Rio Claro units.",
    saudeSteps: ["Present your SUS Health Card", "Choose the nearest health unit", "Confirm available municipal network hours"],
    transpTitle: "Transparency",
    transpDesc: "Monitor the management of municipal public resources.",
    transpSteps: ["Access revenue and expenses in real-time", "Check open public tenders", "Monitor municipal employee salaries"],
    officialTitle: "Official Website",
    officialDesc: "Access the full portal of Rio Claro City Hall.",
    officialSteps: ["Official portal with institutional news", "Links to official gazette and notices", "Phone numbers and contacts for all departments"],
    askAi: "Ask AI",
    errorAi: "Sorry, I had trouble processing your question. Try again soon.",
    requirements: "Requirements",
    steps: "Step by Step",
    printTicket: "Print Ticket",
    seeDetails: "See Details on Mobile",
    locationLabel: "Service Location",
    mainOffice: "City Hall: Matrix Square, Downtown",
    adminPasswordTitle: "Restricted Access",
    adminPasswordLabel: "Enter admin password to access the panel:",
    adminPasswordPlaceholder: "Access password...",
    adminPasswordError: "Incorrect password! Access denied.",
    confirm: "Confirm",
    cancel: "Cancel"
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
    iptuSteps: ["Tenga a mano el número de registro catastral", "Verifique la dirección de la propiedad", "Elija el método de pago (PIX o Boleto)"],
    certTitle: "Certificados",
    certDesc: "Certificados negativos y documentos municipales.",
    certSteps: ["Ingrese CPF o CNPJ", "Seleccione el tipo de certificado", "Emisión instantánea con código de autenticidad"],
    ouvidTitle: "Defensoría",
    ouvidTitleFull: "Hablar con la Defensoría",
    ouvidDesc: "Hable con la Alcaldía: sugerencias o quejas.",
    ouvidSteps: ["Elija tipo: Elogio, Queja o Sugerencia", "Adjunte fotos si es necesario (vía QR Code)", "Guarde su número de protocolo"],
    saudeTitle: "Citas Médicas",
    saudeDesc: "Reserve citas en las unidades de Rio Claro.",
    saudeSteps: ["Presente su Carnet de Salud SUS", "Elija la unidad de salud más cercana", "Confirme el horario disponible en la red municipal"],
    transpTitle: "Transparencia",
    transpDesc: "Monitorear la gestão de los recursos públicos municipales.",
    transpSteps: ["Acceda a ingresos y gastos en tempo real", "Consulte licitaciones abertas", "Siga los salarios de los empleados municipales"],
    officialTitle: "Sitio Oficial",
    officialDesc: "Acceda al portal completo de la Alcaldía de Rio Claro.",
    officialSteps: ["Portal oficial con noticias institucionales", "Enlaces al diario oficial y edictos", "Teléfonos de todas las secretarías"],
    askAi: "Preguntar a la IA",
    errorAi: "Lo siento, tuve un problema al procesar su consulta. Inténtelo de nuevo.",
    requirements: "Requisitos",
    steps: "Paso a Paso",
    printTicket: "Imprimir Turno",
    seeDetails: "Ver Detalles en el Móvil",
    locationLabel: "Ubicación de Atención",
    mainOffice: "Palacio Municipal: Plaza de la Matriz, Centro",
    adminPasswordTitle: "Acceso Restringido",
    adminPasswordLabel: "Ingrese la contraseña administrativa para acceder al panel:",
    adminPasswordPlaceholder: "Contraseña de acceso...",
    adminPasswordError: "¡Contraseña incorrecta! Acceso denegado.",
    confirm: "Confirmar",
    cancel: "Cancelar"
  }
};

export type TranslationType = typeof translations.pt;

export function useKioskStore() {
  const [language, setLanguage] = useState<Language>('pt');
  const [highContrast, setHighContrast] = useState(false);
  const [wheelchairMode, setWheelchairMode] = useState(false);
  const [emergencyAlert, setEmergencyAlert] = useState<EmergencyAlert>({ active: false, message: '' });
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

  const updateNews = (id: string, item: Partial<NewsItem>) => {
    const updated = news.map(n => n.id === id ? { ...n, ...item } : n);
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

  const deleteScreensaver = (id: string) => {
    const updated = screensaverItems.filter(s => s.id !== id);
    setScreensaverItems(updated);
    localStorage.setItem('civitas_screensaver', JSON.stringify(updated));
  };

  const t = translations[language];

  return {
    language, changeLanguage,
    highContrast, setHighContrast,
    wheelchairMode, setWheelchairMode,
    emergencyAlert, updateEmergency,
    news, addNews, updateNews, deleteNews,
    screensaverItems, addScreensaver, deleteScreensaver,
    isInitialized, t
  };
}
