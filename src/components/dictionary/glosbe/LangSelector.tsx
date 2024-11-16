"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowBigRight } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";

interface DynamicSelectProps {
  placeholder?: string;
  onChange?: (value: string) => void;
  loading?: boolean;
}

export default function GlosbeSelctor({
  onChange,
  loading = false,
}: DynamicSelectProps) {
  const [fromValue, setFromValue] = useState<string>("en");
  const [toValue, setToValue] = useState<string>("ar");
  const options: { id: string; text: string }[] = [
    { id: "en", text: "English" },
    { id: "ar", text: "Arabic" },
    { id: "es", text: "Spanish" },
    { id: "fr", text: "French" },
    { id: "it", text: "Italian" },
    { id: "de", text: "German" },
    { id: "tu", text: "Turkish" },
  ];

  useEffect(() => {
    if (onChange) {
      onChange(`${fromValue}/${toValue}`);
    }
  }, [fromValue, onChange, toValue]);

  return (
    <React.Fragment>
      <Select value={fromValue} onValueChange={setFromValue} disabled={loading}>
        <SelectTrigger className="w-[280px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.text}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <ArrowBigRight className="rotate-90 sm:rotate-0" />
      <Select value={toValue} onValueChange={setToValue} disabled={loading}>
        <SelectTrigger className="w-[280px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.text}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </React.Fragment>
  );
}
