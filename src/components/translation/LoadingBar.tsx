"use client";
import { useTranslation } from "@/context/TranslationContext";
import { Progress } from "@radix-ui/react-progress";

export default function LoadingBar() {
  const { loading, progress } = useTranslation();
  return <Progress value={progress} hidden={!loading} />;
}
