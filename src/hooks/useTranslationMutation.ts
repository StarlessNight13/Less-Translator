import { useTranslation } from "@/context/TranslationContext";
import { joinTextChunks, splitTextByParagraphs } from "@/lib/textHelpers";
import { api } from "@/trpc/react";

export function useTranslationMutation() {
  const {
    text,
    from,
    to,
    translator,
    setLoading,
    setProgress,
    setTranslations,
  } = useTranslation();

  const mutation = api.translate.translateText.useMutation({});

  const handleTranslate = async () => {
    if (!text) return;

    try {
      setLoading(true);
      const splitText = splitTextByParagraphs(text);

      const results = await Promise.all(
        splitText.map(async (text, index) => {
          if (!text) return text;

          const result = await mutation.mutateAsync({
            text,
            from,
            to,
            translator,
          });

          setProgress((index / splitText.length) * 100);
          return result ?? "";
        }),
      );

      setTranslations(joinTextChunks(results));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return { handleTranslate };
}
