import { type Glosbe } from "@/types/Dictionary";
import jsdom from "jsdom";

const { JSDOM } = jsdom;

async function parseHtmlDocument(html: string): Promise<Document> {
  const { window } = new JSDOM(html);
  return window.document;
}

function parseGlosbeTranslations(document: Document): Glosbe[] {
  const translationsElements = document.querySelectorAll(
    "ul.pr-1 li[data-element='translation']",
  );

  if (translationsElements.length === 0) {
    return [getDefaultTranslation()];
  }

  return Array.from(translationsElements).map(parseGlosbeTranslation);
}

function getDefaultTranslation(): Glosbe {
  return {
    to: "لا توجد ترجمة",
    exampleFrom: "",
    exampleTo: "",
    def: "",
  };
}

function parseGlosbeTranslation(translationElement: Element): Glosbe {
  return {
    to: getArabicTranslationFromElement(translationElement),
    def: getDefinitionFromElement(translationElement),
    exampleFrom: getArabicExampleFromElement(translationElement),
    exampleTo: getEnglishExampleFromElement(translationElement),
  };
}

function getArabicTranslationFromElement(element: Element): string {
  const h3Element = element.querySelector("h3");
  return h3Element?.textContent ?? "No Arabic translation available";
}

function getDefinitionFromElement(element: Element): string {
  const definitionElement = element.querySelector(".translation__definition");
  return definitionElement?.textContent ?? "No Definition available";
}

function getArabicExampleFromElement(element: Element): string {
  const exampleElement = element.querySelector(
    ".translation__example p:last-child",
  );
  return exampleElement?.textContent ?? "";
}

function getEnglishExampleFromElement(element: Element): string {
  const exampleElement = element.querySelector(
    ".translation__example p:first-child",
  );
  return exampleElement?.textContent ?? "";
}

/**
 * Fetches data from Glosbe and returns an array of translations.
 *
 * @param {string} url - The URL to fetch data from.
 * @return {Promise<Glosbe[]>} An array of translations.
 */
export async function fetchDataFromGlosbe(url: string): Promise<Glosbe[]> {
  const response = await fetch(url);
  const html = await response.text();
  const document = await parseHtmlDocument(html);
  return parseGlosbeTranslations(document);
}
