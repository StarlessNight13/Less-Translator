/**
 * Splits a given text into chunks based on a maximum chunk length.
 *
 * @param {string} text - The text to be split into chunks.
 * @param {number} [maxChunkLength=2000] - The maximum length of each chunk.
 * @returns {string[]} An array of text chunks.
 */
export function splitTextIntoChunks(
  text: string,
  maxChunkLength = 2000,
): string[] {
  const paragraphs = text.split(/\n\s*\n/);
  const chunks: string[] = [];
  let currentChunk = "";

  for (const paragraph of paragraphs) {
    const newLength = currentChunk.length + paragraph.length + 2;

    if (newLength <= maxChunkLength) {
      currentChunk += `${paragraph}\n\n`;
    } else {
      chunks.push(currentChunk.trim());
      currentChunk = `${paragraph}\n\n`;
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

export function splitTextByParagraphs(
  text: string,
  maxChunkSize = 2000,
): string[] {
  const paragraphs = text.split("\n\n"); // Split the text by paragraphs (double newlines)
  const chunks: string[] = [];
  let currentChunk = "";

  for (const paragraph of paragraphs) {
    // Check if adding this paragraph exceeds the max chunk size
    if (currentChunk.length + paragraph.length + 2 > maxChunkSize) {
      // +2 accounts for the added '\n\n'
      chunks.push(currentChunk.trim()); // Push the current chunk to the result
      currentChunk = paragraph; // Start a new chunk with the current paragraph
    } else {
      // Add the paragraph to the current chunk
      currentChunk += currentChunk ? "\n\n" + paragraph : paragraph;
    }
  }

  // Don't forget to add the last chunk if it exists
  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

export function joinTextChunks(chunks: string[]): string {
  return chunks.join("\n\n");
}
