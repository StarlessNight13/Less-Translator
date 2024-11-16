"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DynamicSelectProps {
  placeholder?: string;
  onChange?: (value: string) => void;

  loading?: boolean;
}

export default function ArabdicSelctor({
  onChange,
  loading = false,
}: DynamicSelectProps) {
  const [value, setValue] = useState<string>("english-arabic");
  const options: { id: string; text: string }[] = [
    { id: "english-arabic", text: "Arabic - English" },
    { id: "deutsch-arabisch", text: "Arabic - German" },
    { id: "spanish-arabic", text: "Arabic - Spanish" },
    { id: "french-arabic", text: "Arabic - French" },
    { id: "turkish-arabic", text: "Arabic - Turkish" },
    { id: "italian-arabic", text: "Arabic - Italian" },
  ];

  useEffect(() => {
    if (onChange) {
      onChange(value);
    }
  }, [onChange, value]);

  return (
    <Select value={value} onValueChange={setValue} disabled={loading}>
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
  );
}
