// components/LanguageSelect/types.ts
"use client";

export interface Language {
  language: string;
  code: LanguageCode;
}

export const languages: Language[] = [
  { language: "Arabic", code: "ar" },
  { language: "English", code: "en" },
  { language: "Spanish", code: "es" },
  { language: "Chinese (Mandarin)", code: "zh" },
  { language: "French", code: "fr" },
  { language: "German", code: "de" },
  { language: "Portuguese", code: "pt" },
  { language: "Russian", code: "ru" },
  { language: "Japanese", code: "ja" },
] as const;

// components/LanguageSelect/FromLanguageSelect.tsx
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type LanguageCode } from "@/types/translation";
import { useTranslation } from "@/context/TranslationContext";

export function FromLanguageSelect() {
  const { from, setFrom } = useTranslation();

  const handleFromChange = (value: string) => {
    setFrom(value as LanguageCode);
  };

  return (
    <Select onValueChange={handleFromChange} defaultValue="auto" value={from}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>From</SelectLabel>
          <SelectItem value="auto">Auto detect</SelectItem>
          {languages.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              {language.language}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

//  ====================================================================

export function ToLanguageSelect() {
  const { to, setTo } = useTranslation();

  const handleToChange = (value: string) => {
    setTo(value as LanguageCode);
  };

  return (
    <Select onValueChange={handleToChange} defaultValue="ar" value={to}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>To</SelectLabel>
          {languages.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              {language.language}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
