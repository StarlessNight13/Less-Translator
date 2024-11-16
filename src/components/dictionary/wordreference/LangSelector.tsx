"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LanguageOption {
  id: string;
  value: string;
  text: string;
  selected?: boolean;
}

interface LanguageGroup {
  label: string;
  options: LanguageOption[];
}

interface LanguageSelectProps {
  languageGroups?: LanguageGroup[];
  onChange?: (value: string) => void;
  loading?: boolean;
}

const defaultLanguageGroups: LanguageGroup[] = [
  {
    label: "Arabic",
    options: [
      { id: "enar", value: "enar", text: "English ⪧ Arabic", selected: true },
      { id: "aren", value: "aren", text: "Arabic ⪧ English" },
    ],
  },
  {
    label: "German",
    options: [
      { id: "ende", value: "ende", text: "English ⪧ German" },
      { id: "deen", value: "deen", text: "German ⪧ English" },
      { id: "dees", value: "dees", text: "German ⪧ Spanish" },
    ],
  },
  {
    label: "English monolingual",
    options: [
      { id: "enen", value: "enen", text: "English definition" },
      { id: "enthe", value: "enthe", text: "English synonyms" },
      { id: "enusg", value: "enusg", text: "English usage" },
      { id: "encol", value: "encol", text: "English collocations" },
      { id: "enconj", value: "enconj", text: "English: conjugations" },
    ],
  },
  {
    label: "Spanish",
    options: [
      { id: "enes", value: "enes", text: "English ⪧ Spanish" },
      { id: "esen", value: "esen", text: "Spanish ⪧ English" },
      { id: "esfr", value: "esfr", text: "Spanish ⪧ French" },
      { id: "espt", value: "espt", text: "Spanish ⪧ Portuguese" },
      { id: "esit", value: "esit", text: "Spanish ⪧ Italian" },
      { id: "esde", value: "esde", text: "Spanish ⪧ German" },
      { id: "eses", value: "eses", text: "Spanish: definition" },
      { id: "essin", value: "essin", text: "Spanish: synonyms" },
      { id: "esconj", value: "esconj", text: "Spanish: conjugations" },
    ],
  },
  {
    label: "French",
    options: [
      { id: "enfr", value: "enfr", text: "English ⪧ French" },
      { id: "fren", value: "fren", text: "French ⪧ English" },
      { id: "fres", value: "fres", text: "French ⪧ Spanish" },
      { id: "frconj", value: "frconj", text: "French: conjugations" },
    ],
  },
  {
    label: "Italian",
    options: [
      { id: "enit", value: "enit", text: "English ⪧ Italian" },
      { id: "iten", value: "iten", text: "Italian ⪧ English" },
      { id: "ites", value: "ites", text: "Italian ⪧ Spanish" },
      { id: "itit", value: "itit", text: "Italian definition" },
      { id: "itconj", value: "itconj", text: "Italian: conjugations" },
    ],
  },
  {
    label: "Catalan",
    options: [{ id: "caca", value: "caca", text: "Català: definició" }],
  },

  {
    label: "Dutch",
    options: [
      { id: "ennl", value: "ennl", text: "English ⪧ Dutch" },
      { id: "nlen", value: "nlen", text: "Dutch ⪧ English" },
    ],
  },
  {
    label: "Swedish",
    options: [
      { id: "ensv", value: "ensv", text: "English ⪧ Swedish" },
      { id: "sven", value: "sven", text: "Swedish ⪧ English" },
    ],
  },
  {
    label: "Icelandic",
    options: [{ id: "enis", value: "enis", text: "English ⪧ Icelandic" }],
  },
  {
    label: "Russian",
    options: [
      { id: "enru", value: "enru", text: "English ⪧ Russian" },
      { id: "ruen", value: "ruen", text: "Russian ⪧ English" },
    ],
  },
  {
    label: "Portuguese",
    options: [
      { id: "enpt", value: "enpt", text: "English ⪧ Portuguese" },
      { id: "pten", value: "pten", text: "Portuguese ⪧ English" },
      { id: "ptes", value: "ptes", text: "Portuguese ⪧ Spanish" },
    ],
  },
  {
    label: "Polish",
    options: [
      { id: "enpl", value: "enpl", text: "English ⪧ Polish" },
      { id: "plen", value: "plen", text: "Polish ⪧ English" },
    ],
  },
  {
    label: "Romanian",
    options: [
      { id: "enro", value: "enro", text: "English ⪧ Romanian" },
      { id: "roen", value: "roen", text: "Romanian ⪧ English" },
    ],
  },
  {
    label: "Czech",
    options: [
      { id: "encz", value: "encz", text: "English ⪧ Czech" },
      { id: "czen", value: "czen", text: "Czech ⪧ English" },
    ],
  },
  {
    label: "Greek",
    options: [
      { id: "engr", value: "engr", text: "English ⪧ Greek" },
      { id: "gren", value: "gren", text: "Greek ⪧ English" },
    ],
  },
  {
    label: "Turkish",
    options: [
      { id: "entr", value: "entr", text: "English ⪧ Turkish" },
      { id: "tren", value: "tren", text: "Turkish ⪧ English" },
    ],
  },
  {
    label: "Chinese",
    options: [
      { id: "enzh", value: "enzh", text: "English ⪧ Chinese" },
      { id: "zhen", value: "zhen", text: "Chinese ⪧ English" },
    ],
  },
  {
    label: "Japanese",
    options: [
      { id: "enja", value: "enja", text: "English ⪧ Japanese" },
      { id: "jaen", value: "jaen", text: "Japanese ⪧ English" },
    ],
  },
  {
    label: "Korean",
    options: [
      { id: "enko", value: "enko", text: "English ⪧ Korean" },
      { id: "koen", value: "koen", text: "Korean ⪧ English" },
    ],
  },
];

export default function LanguageSelect({
  languageGroups = defaultLanguageGroups,
  onChange,
  loading = false,
}: LanguageSelectProps) {
  const [value, setValue] = useState<string>(() => {
    const defaultOption = languageGroups
      .flatMap((group) => group.options)
      .find((option) => option.selected);
    return defaultOption
      ? defaultOption.value
      : (languageGroups[0]?.options[0]?.value ?? "");
  });

  useEffect(() => {
    if (onChange) {
      onChange(value);
    }
  }, [languageGroups, onChange, value]);

  return (
    <Select value={value} onValueChange={setValue} disabled={loading}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a language option" />
      </SelectTrigger>
      <SelectContent>
        {languageGroups.map((group) => (
          <SelectGroup key={group.label}>
            <SelectLabel>{group.label}</SelectLabel>
            {group.options.map((option) => (
              <SelectItem key={option.id} value={option.value}>
                {option.text}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
