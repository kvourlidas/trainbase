"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { AuthModal, type AuthTab } from "./AuthModal";

type UIContextValue = {
  openAuth: (tab?: AuthTab) => void;
  closeAuth: () => void;
};

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<AuthTab>("login");

  const openAuth = useCallback((tab: AuthTab = "login") => {
    setAuthTab(tab);
    setAuthOpen(true);
  }, []);
  const closeAuth = useCallback(() => setAuthOpen(false), []);

  const value = useMemo(() => ({ openAuth, closeAuth }), [openAuth, closeAuth]);

  return (
    <UIContext.Provider value={value}>
      {children}
      <AuthModal open={authOpen} tab={authTab} onTabChange={setAuthTab} onClose={closeAuth} />
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside <UIProvider>");
  return ctx;
}
