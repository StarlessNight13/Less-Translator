"use client";

import { useTranslation } from "@/context/TranslationContext";
import { useTranslationMutation } from "@/hooks/useTranslationMutation";
import { Textarea } from "../ui/textarea";
import { FromLanguageSelect } from "./SelectLanguage";

export function TranslationInput() {
  const { text, setText, loading } = useTranslation();
  const { handleTranslate } = useTranslationMutation();

  const calcHeight = (value: string) => {
    const numberOfLineBreaks = (value.match(/\n/g) ?? []).length;
    return 20 + numberOfLineBreaks * 20 + 12 + 2;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      handleTranslate();
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-2">
      <FromLanguageSelect />
      <Textarea
        data-name="from"
        className="flex-grow resize-none border-white text-text shadow sm:flex-1"
        style={{
          height: "auto",
          minHeight: calcHeight(text) + "px",
        }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        autoFocus
      />
    </div>
  );
}
