"use client";

import { Languages } from "lucide-react";
import { Toggle } from "../ui/toggle";
import { useTranslation } from "@/context/TranslationContext";

export function TranslatorSelection() {
  const { translator, setTranslator } = useTranslation();

  return (
    <>
      <Toggle
        aria-label="Toggle Google Translate"
        pressed={translator === "Google"}
        onPressedChange={() => setTranslator("Google")}
        className="flex-1"
      >
        <Languages />
        Google
      </Toggle>
      <Toggle
        aria-label="Toggle Bing Translate"
        pressed={translator === "Bing"}
        onPressedChange={() => setTranslator("Bing")}
        className="flex-1"
      >
        <Languages />
        Bing
      </Toggle>
    </>
  );
}
