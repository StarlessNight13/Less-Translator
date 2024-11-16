import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { fetchDataFromArabdict } from "./dictionarys/arabdict";
import { fetchDataFromWordreference } from "./dictionarys/wordreference";
import { fetchDataFromGlosbe } from "./dictionarys/glosbe";

// Initialize tRPC
const t = initTRPC.create();

// Create your router
export const dictionaryRouter = t.router({
  lookupWord: t.procedure
    .input(
      z.object({
        text: z.string(),
        selectedlanguage: z.string(),
        dictionary: z.enum(["arabdict", "wordreference", "glosbe"]),
      }),
    )
    .mutation(async ({ input }) => {
      const { text, selectedlanguage, dictionary } = input;

      if (dictionary === "arabdict") {
        try {
          const url = `https://www.arabdict.com/en/${selectedlanguage}/` + text;
          const data = await fetchDataFromArabdict(url);
          return data;
        } catch (err) {
          if (err instanceof Error) {
            console.error("Error message:", err.message);
            throw new Error(" failed: " + err.message + " _for " + text);
          }
          throw new Error("Unknown error occurred ");
        }
      } else if (dictionary === "wordreference") {
        try {
          const url =
            `https://www.wordreference.com/${selectedlanguage}/` +
            decodeURIComponent(text);
          const data = await fetchDataFromWordreference(url, selectedlanguage);
          return data;
        } catch (err) {
          if (err instanceof Error) {
            console.error("Error message:", err.message);
            throw new Error(" failed: " + err.message + " _for " + text);
          }
          throw new Error("Unknown error occurred ");
        }
      } else if (dictionary === "glosbe") {
        try {
          const url = `https://glosbe.com/${selectedlanguage}/` + text;
          const data = await fetchDataFromGlosbe(url);
          return data;
        } catch (err) {
          if (err instanceof Error) {
            console.error("Error message:", err.message);
            throw new Error(" failed: " + err.message + " _for " + text);
          }
          throw new Error("Unknown error occurred ");
        }
      }
    }),
});
