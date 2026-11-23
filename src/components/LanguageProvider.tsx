"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { dict, type Dict, type Lang } from "@/lib/i18n";

const STORAGE_KEY = "freelearn-lang";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
};

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  t: dict.en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // On first load: use the saved choice, or the browser's language
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // Storage unavailable: fall back to the browser language
    }
    if (saved === "fr" || saved === "en") {
      setLangState(saved);
    } else if (navigator.language.toLowerCase().startsWith("fr")) {
      setLangState("fr");
    }
  }, []);

  // Keep the page's language attribute in sync
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function setLang(next: Lang) {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Not saved, but the page still switches
    }
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dict[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}