export interface DictionaryData {
  arabdict?: Arabdict;
  glosbe?: Array<Glosbe>;
  wordreference?: Array<WordReference>;
}

export type Dictionarys = "arabdict" | "glosbe" | "wordreference";

export interface Arabdict {
  translation: TranslationPair[];
  page: number[];
}

export interface TranslationPair {
  left: string | null | undefined;
  right: string | null | undefined;
}

export interface Glosbe {
  to: string;
  def: string;
  exampleFrom?: string | null | undefined;
  exampleTo?: string | null | undefined;
}

export interface WordReference {
  from: string;
  mid: string;
  to: string;
}
