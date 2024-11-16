"use client";

import { Copy, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Toggle } from "../ui/toggle";
import { ToLanguageSelect } from "./SelectLanguage";
import { useTranslation } from "@/context/TranslationContext";

export function TranslationOutput() {
  const { translations, editable, setEditable, fontSize, setFontSize } =
    useTranslation();
  const [preValue, setPreValue] = useState<string | null>(null);

  useEffect(() => {
    if (!translations) return;
    setPreValue(translations);
  }, [translations]);

  const handleCopy = () => {
    void navigator.clipboard.writeText(preValue ?? "");
  };

  return (
    <div className="flex flex-1 flex-col gap-2">
      <ToLanguageSelect />
      <div className="flex flex-1 flex-col rounded bg-crust">
        <div className="relative mb-2 flex max-h-0 flex-row justify-between overflow-hidden border-b-[20px] transition-all duration-500 hover:max-h-full hover:border-b hover:p-1 hover:transition-all hover:duration-500">
          <Toggle
            onPressedChange={setEditable}
            size="sm"
            pressed={editable}
            aria-label="toggle edit mode"
          >
            <Edit size={20} />
          </Toggle>
          <div className="flex flex-row items-center justify-center gap-2">
            <Button
              onClick={() => setFontSize(fontSize + 1)}
              size="icon"
              variant="ghost"
              className="text-xl"
            >
              +
            </Button>
            <p>Font {fontSize}</p>
            <Button
              onClick={() => setFontSize(fontSize - 1)}
              size="icon"
              variant="ghost"
              className="text-xl"
            >
              -
            </Button>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleCopy}
            aria-label="Copy to clipboard"
          >
            <Copy size={20} />
          </Button>
        </div>
        <pre
          dir="auto"
          className={`text-wrap p-2 font-serif`}
          style={{ fontSize }}
          contentEditable={editable}
          suppressContentEditableWarning={true}
          onInput={(e) => setPreValue(e.currentTarget.textContent)}
        >
          {translations}
        </pre>
      </div>
    </div>
  );
}
