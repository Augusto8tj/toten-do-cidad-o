
"use client"

import { useState, useEffect, useCallback } from 'react'
import { useKioskStore } from '@/store/kiosk-store'
import { AccessibilityControls } from '@/components/kiosk/AccessibilityControls'
import { EmergencyBanner } from '@/components/kiosk/EmergencyBanner'
import { Screensaver } from '@/components/kiosk/Screensaver'
import { CitizenView } from '@/components/kiosk/CitizenView'
import { AdminView } from '@/components/kiosk/AdminView'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'

const INACTIVITY_TIMEOUT = 30000; // 30 seconds

export default function Home() {
  const store = useKioskStore();
  const [activeTab, setActiveTab] = useState<'citizen' | 'admin'>('citizen');
  const [showScreensaver, setShowScreensaver] = useState(false);
  const [lastActivity, setLastActivity] = useState<number | null>(null);

  useEffect(() => {
    setLastActivity(Date.now());
  }, []);

  const resetInactivity = useCallback(() => {
    setLastActivity(Date.now());
    if (showScreensaver) {
      setShowScreensaver(false);
    }
  }, [showScreensaver]);

  useEffect(() => {
    if (activeTab === 'admin' || lastActivity === null) {
      setShowScreensaver(false);
      return;
    }

    const interval = setInterval(() => {
      if (Date.now() - lastActivity > INACTIVITY_TIMEOUT && !showScreensaver) {
        setShowScreensaver(true);
      }
    }, 1000);

    const events = ['mousemove', 'touchstart', 'keydown'];
    events.forEach(e => window.addEventListener(e, resetInactivity));

    return () => {
      clearInterval(interval);
      events.forEach(e => window.removeEventListener(e, resetInactivity));
    };
  }, [lastActivity, showScreensaver, resetInactivity, activeTab]);

  if (!store.isInitialized) return null;

  return (
    <main className={cn(
      "min-h-screen relative overflow-hidden bg-cool-gray selection:bg-primary selection:text-white",
      store.highContrast && "high-contrast"
    )}>
      {/* Top Banner */}
      <EmergencyBanner 
        active={store.emergencyAlert.active} 
        message={store.emergencyAlert.message} 
        t={store.t}
      />

      <div className="flex flex-col h-screen">
        {/* Navigation & Accessibility */}
        <div className="flex flex-col">
          <div className="bg-slate-900 h-10 flex items-center px-4 justify-between">
            <span className="text-slate-400 text-xs font-mono uppercase tracking-widest">
              {store.t.unit}: #RC-001-CENTRO-SUL | Rio Claro - RJ
            </span>
            <div className="flex gap-4">
              <button 
                onClick={() => setActiveTab('citizen')} 
                className={cn("text-xs font-bold px-2 py-1 rounded transition-colors", activeTab === 'citizen' ? "bg-primary text-white" : "text-slate-400 hover:text-white")}
              >
                TOTEM
              </button>
              <button 
                onClick={() => setActiveTab('admin')} 
                className={cn("text-xs font-bold px-2 py-1 rounded transition-colors", activeTab === 'admin' ? "bg-primary text-white" : "text-slate-400 hover:text-white")}
              >
                ADMIN
              </button>
            </div>
          </div>
          
          <AccessibilityControls 
            highContrast={store.highContrast}
            setHighContrast={store.setHighContrast}
            wheelchairMode={store.wheelchairMode}
            setWheelchairMode={store.setWheelchairMode}
            language={store.language}
            setLanguage={store.changeLanguage}
            isAdmin={activeTab === 'admin'}
            t={store.t}
          />
        </div>

        {/* View Switching */}
        <div className="flex-1 relative overflow-hidden">
          {activeTab === 'citizen' ? (
            <CitizenView 
              wheelchairMode={store.wheelchairMode} 
              news={store.news} 
              language={store.language}
              t={store.t}
            />
          ) : (
            <AdminView 
              news={store.news}
              addNews={store.addNews}
              updateNews={store.updateNews}
              deleteNews={store.deleteNews}
              emergencyAlert={store.emergencyAlert}
              updateEmergency={store.updateEmergency}
              screensaverItems={store.screensaverItems}
              addScreensaver={store.addScreensaver}
              deleteScreensaver={store.deleteScreensaver}
            />
          )}
        </div>
      </div>

      {/* Overlays */}
      {showScreensaver && activeTab === 'citizen' && (
        <Screensaver 
          items={store.screensaverItems} 
          onDismiss={resetInactivity} 
          t={store.t}
        />
      )}

      <Toaster />
    </main>
  );
}
