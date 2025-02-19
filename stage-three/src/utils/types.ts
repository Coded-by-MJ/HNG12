export type AppMode = "Detection" | "Translation" | "Summary";

export type LanguageCode = "en" | "pt" | "es" | "ru" | "tr" | "fr";

export interface options {
  code: LanguageCode;
  language: string;
}

export interface ChatBox {
  id: string;
  from: "User" | "Chucky";
  subject?: string;
  text: string;
}
