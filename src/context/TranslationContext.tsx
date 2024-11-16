"use client";
import { type LanguageCode } from "@/types/translation";
import React, { createContext, useContext, useState } from "react";

type TranslatorType = "Google" | "Bing";

interface TranslationContextType {
  from: LanguageCode;
  to: LanguageCode;
  text: string;
  translator: TranslatorType;
  translations: string | undefined;
  loading: boolean;
  progress: number;
  fontSize: number;
  editable: boolean;
  setFrom: (code: LanguageCode) => void;
  setTo: (code: LanguageCode) => void;
  setText: (text: string) => void;
  setTranslator: (translator: TranslatorType) => void;
  setTranslations: (translations: string | undefined) => void;
  setLoading: (loading: boolean) => void;
  setProgress: (progress: number) => void;
  setFontSize: (size: number) => void;
  setEditable: (editable: boolean) => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined,
);

export function TranslationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [from, setFrom] = useState<LanguageCode>("auto");
  const [to, setTo] = useState<LanguageCode>("ar");
  const [text, setText] = useState<string>("");
  const [translator, setTranslator] = useState<TranslatorType>("Google");
  const [translations, setTranslations] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [fontSize, setFontSize] = useState<number>(16);
  const [editable, setEditable] = useState<boolean>(false);

  return (
    <TranslationContext.Provider
      value={{
        from,
        to,
        text,
        translator,
        translations,
        loading,
        progress,
        fontSize,
        editable,
        setFrom,
        setTo,
        setText,
        setTranslator,
        setTranslations,
        setLoading,
        setProgress,
        setFontSize,
        setEditable,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
