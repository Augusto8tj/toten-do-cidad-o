
"use client"

import { useState, useEffect } from 'react'

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
    title: 'Nova Praça Central inaugurada',
    content: 'O novo espaço de lazer conta com Wi-Fi gratuito e pista de caminhada.',
    imageUrl: 'https://picsum.photos/seed/park1/800/600',
    date: '10 Out 2023'
  },
  {
    id: '2',
    title: 'Mutirão de Vacinação no Sábado',
    content: 'Todas as unidades básicas de saúde estarão abertas das 8h às 17h.',
    imageUrl: 'https://picsum.photos/seed/health/800/600',
    date: '12 Out 2023'
  }
];

const DEFAULT_SCREENSAVER: ScreensaverItem[] = [
  { id: 's1', imageUrl: 'https://picsum.photos/seed/city1/1920/1080', caption: 'Conheça nossa cidade' },
  { id: 's2', imageUrl: 'https://picsum.photos/seed/city2/1920/1080', caption: 'Pague seu IPTU online' },
  { id: 's3', imageUrl: 'https://picsum.photos/seed/city3/1920/1080', caption: 'Festival de Inverno começa em breve' }
];

export function useKioskStore() {
  const [highContrast, setHighContrast] = useState(false);
  const [wheelchairMode, setWheelchairMode] = useState(false);
  const [emergencyAlert, setEmergencyAlert] = useState({ active: false, message: '' });
  const [news, setNews] = useState<NewsItem[]>([]);
  const [screensaverItems, setScreensaverItems] = useState<ScreensaverItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Load from localStorage on mount
    const storedNews = localStorage.getItem('civitas_news');
    const storedScreensaver = localStorage.getItem('civitas_screensaver');
    const storedEmergency = localStorage.getItem('civitas_emergency');

    setNews(storedNews ? JSON.parse(storedNews) : DEFAULT_NEWS);
    setScreensaverItems(storedScreensaver ? JSON.parse(storedScreensaver) : DEFAULT_SCREENSAVER);
    setEmergencyAlert(storedEmergency ? JSON.parse(storedEmergency) : { active: false, message: '' });
    setIsInitialized(true);
  }, []);

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

  return {
    highContrast, setHighContrast,
    wheelchairMode, setWheelchairMode,
    emergencyAlert, updateEmergency,
    news, addNews, deleteNews,
    screensaverItems, addScreensaver,
    isInitialized
  };
}
