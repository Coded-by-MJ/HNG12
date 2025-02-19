import { options } from "./types";

export const countryOptions: options[] = [
  {
    code: "en",
    language: "English",
  },
  {
    code: "pt",
    language: "Portuguese",
  },
  {
    code: "es",
    language: "Spanish",
  },
  {
    code: "ru",
    language: "Russian",
  },
  {
    code: "tr",
    language: "Turkish",
  },
  {
    code: "fr",
    language: "French",
  },
];

export const summaryOptions = {
  sharedContext: "This is a technical article",
  type: "tl;dr",
  format: "plain-text",
  length: "short",
};

export const languageTagToHumanReadable = (
  languageTag: string,
  targetLanguage: string
): string => {
  const displayNames = new Intl.DisplayNames([targetLanguage], {
    type: "language",
  });
  return displayNames.of(languageTag) ?? "Unknown Language";
};
