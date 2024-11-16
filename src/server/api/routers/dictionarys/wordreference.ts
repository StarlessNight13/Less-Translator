import { type WordReference } from "@/types/Dictionary";
import { JSDOM } from "jsdom";

async function processDocument(res: string): Promise<Document> {
  const { window } = new JSDOM(res);
  return window.document;
}

function renderTranslationData(
  document: Document,
  dictData: string,
): WordReference[] {
  const translationTables = document.querySelectorAll("#articleWRD table.WRD");

  return Array.from(translationTables).flatMap((table) => {
    const rows = table.querySelectorAll(`[id^='${dictData}:']`);
    return Array.from(rows).map((row) => ({
      from: getEnglishTranslationFromRow(row),
      mid: getMidFromRow(row),
      to: getArabicTranslationFromRow(row),
    }));
  });
}

function getEnglishTranslationFromRow(row: Element): string {
  const firstChild = row.firstElementChild?.firstElementChild;
  return firstChild?.textContent ?? "No English translation available";
}

function getMidFromRow(row: Element): string {
  const midElement = row.childNodes[1];
  return midElement?.textContent ?? "No translation available";
}

function getArabicTranslationFromRow(row: Element): string {
  const lastChild = row.lastChild;
  return lastChild?.textContent ?? "No Arabic translation available";
}

/**
 * Fetches data from a given URL and processes it into a list of translation items.
 *
 * @param {string} url - The URL to fetch data from.
 * @param {string} dictData - The dictionary data to use for processing.
 * @return {Promise<WordReference[]>} A promise resolving to a list of translation items.
 */
export async function fetchDataFromWordreference(
  url: string,
  dictData: string,
): Promise<WordReference[]> {
  try {
    const response = await fetch(url);
    const data = await response.text();
    const document = await processDocument(data);
    return renderTranslationData(document, dictData);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
