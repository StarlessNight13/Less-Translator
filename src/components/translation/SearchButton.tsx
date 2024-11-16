"use client";

import { useTranslationMutation } from "@/hooks/useTranslationMutation";
import { Book } from "lucide-react";
import { Button } from "../ui/button";

export default function SearchButton() {
  const { handleTranslate } = useTranslationMutation();
  return (
    <Button onClick={handleTranslate} className="flex-1">
      Translate
      <Book />
    </Button>
  );
}
