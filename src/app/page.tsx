
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Lock } from "lucide-react"

const INACTIVITY_TIMEOUT = 30000; // 30 seconds
const ADMIN_PASSWORD = "rioclaro2024";

export default function Home() {
  const store = useKioskStore();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'citizen' | 'admin'>('citizen');
  const [showScreensaver, setShowScreensaver] = useState(false);
  const [lastActivity, setLastActivity] = useState<number | null>(null);
  
  // Admin Authentication State
  const [isAdminAuthDialogOpen, setIsAdminAuthDialogOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  const handleAdminClick = () => {
    if (activeTab === 'admin') return;
    
    if (isAuthenticated) {
      setActiveTab('admin');
    } else {
      setIsAdminAuthDialogOpen(true);
    }
  };

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setActiveTab('admin');
      setIsAdminAuthDialogOpen(false);
      setPasswordInput('');
      toast({
        title: "Acesso Concedido",
        description: "Bem-vindo ao painel administrativo.",
      });
    } else {
      toast({
        variant: "destructive",
        title: store.t.adminPasswordError,
      });
      setPasswordInput('');
    }
  };

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
                onClick={handleAdminClick} 
                className={cn(
                  "text-xs font-bold px-2 py-1 rounded transition-colors flex items-center gap-1", 
                  activeTab === 'admin' ? "bg-primary text-white" : "text-slate-400 hover:text-white"
                )}
              >
                {!isAuthenticated && activeTab !== 'admin' && <Lock className="h-3 w-3" />}
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
              onLogout={() => {
                setIsAuthenticated(false);
                setActiveTab('citizen');
              }}
            />
          )}
        </div>
      </div>

      {/* Admin Password Dialog */}
      <Dialog open={isAdminAuthDialogOpen} onOpenChange={setIsAdminAuthDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-[2rem] border-4">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Lock className="h-6 w-6 text-primary" />
              {store.t.adminPasswordTitle}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-lg text-slate-600 mb-4">{store.t.adminPasswordLabel}</p>
            <Input 
              type="password"
              placeholder={store.t.adminPasswordPlaceholder}
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="h-14 text-xl rounded-xl border-2"
              autoFocus
            />
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsAdminAuthDialogOpen(false)} className="h-14 rounded-xl text-lg font-bold">
              {store.t.cancel}
            </Button>
            <Button onClick={handleLogin} className="h-14 rounded-xl text-lg font-bold px-8">
              {store.t.confirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
