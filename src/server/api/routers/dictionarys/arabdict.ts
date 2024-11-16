import { Arabdict } from "@/types/Dictionary";
import jsdom from "jsdom";
const { JSDOM } = jsdom;

async function processDocument(res: string) {
  const { document } = new JSDOM(res).window;
  return document;
}
function RenderData(document: Document) {
  const List = document.querySelectorAll(
    "div.body-wrapper > main > div > div.content > ul > li",
  );
  //  div.body-wrapper > main > div > div.content > ul > li
  const page = document.querySelector(
    " div.body-wrapper > main > div > div.content > div.navigation.p-10 > ul ",
  );
  // div.body-wrapper > main > div > div.content > div.navigation.p-10 > ul > li
  let pages;
  if (page !== null && page !== undefined)
    pages = extractNumbersToArray(page.querySelectorAll(".a-bar-item"));

  const trList = Array.from(List).map((elm) => {
    return {
      left: elm.querySelector(" div:nth-child(1)")?.textContent,
      right: elm.querySelector(" div:nth-child(2)")?.textContent,
    };
  });

  return {
    translation: trList,
    page: pages ?? [],
  };
}

function extractNumbersToArray(nodeList: NodeListOf<Element>) {
  const numbersArray = [];

  // Convert the NodeList to an array using spread operator or Array.from
  const elementsArray = Array.from(nodeList); // or Array.from(nodeList);

  for (const element of elementsArray) {
    const textContent = element.textContent?.trim() ?? "";

    // Check if the text content represents a number using a regular expression
    if (/^\d+(\.\d+)?$/.test(textContent)) {
      numbersArray.push(Number(textContent));
    }
  }

  return numbersArray;
}

/**
 * Fetches data from Arabdict API and processes it into a DataItem object.
 *
 * @param {string} url - The URL to fetch data from.
 * @return {Promise<DataItem>} A promise resolving to a DataItem object containing translation data and pagination information.
 */
export async function fetchDataFromArabdict(url: string): Promise<Arabdict> {
  try {
    const response = await fetch(url);
    const data = await response.text();
    const doc = await processDocument(data);
    const Data = RenderData(doc);
    return Data;
  } catch (error) {
    console.error("error:", error);
    throw error;
  }
}
