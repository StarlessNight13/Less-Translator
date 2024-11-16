import { z } from "zod";
import { initTRPC } from "@trpc/server";

import translate from "translate";
import { translate as bingTranslate } from "bing-translate-api";

// Initialize tRPC
const t = initTRPC.create();

// Create your router
export const translationRouter = t.router({
  translateText: t.procedure
    .input(
      z.object({
        text: z.string(),
        from: z.string(),
        to: z.string(),
        translator: z.enum(["Google", "Bing"]),
      }),
    )
    .mutation(async ({ input }) => {
      const { text, from, to, translator } = input;

      switch (translator) {
        case "Google":
          try {
            const From = from === "auto" ? undefined : from;
            const translated = await translate(text, {
              from: From,
              to,
            });
            return translated;
          } catch (err: unknown) {
            if (err instanceof Error) {
              console.error("Error message:", err.message);
              throw new Error(
                "Translation failed: " + err.message + " _for " + text,
              );
            }
            throw new Error("Unknown error occurred during translation");
          }
          break;
        case "Bing":
          let From: string | null = from;
          if (from === "auto") {
            From = "auto-detect";
          } else if (from === "zh") {
            From = "zh-Hans";
          }
          try {
            const result = await bingTranslate(text, From, to);
            const translated = result?.translation;
            return translated;
          } catch (err) {
            if (err instanceof Error) {
              console.error("Error message:", err.message);
              throw new Error(
                "Translation failed: " + err.message + " _for " + text,
              );
            }
            throw new Error("Unknown error occurred during translation");
          }
          break;
        default:
          throw new Error("Unknown translator");
      }
    }),
});
