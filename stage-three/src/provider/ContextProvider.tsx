import { createContext, useContext, useEffect, useState } from "react";

import { nanoid } from "nanoid";
import { AppMode, ChatBox, LanguageCode } from "../utils/types";
import { toast } from "react-toastify";
import {
  countryOptions,
  languageTagToHumanReadable,
  summaryOptions,
} from "../utils/helper";
interface AppContextType {
  appMode: AppMode;
  userInput: { text: string; language: string };
  appChats: ChatBox[];
  isLoading: boolean;
  showSummarizeButton: boolean;
  addToChats: ({ from, text }: { from: ChatBox["from"]; text: string }) => void;
  setAppMode: (mode: AppMode) => void;
  handleTextChange: (newText: string) => void;
  handleSelectChange: (newLanguage: LanguageCode) => void;
  handleSubmitText: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [appMode, setAppMode] = useState<AppMode>("Detection");
  const [userInput, setUserInput] = useState({
    text: "",
    language: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSummarizeButton, setShowSummarizeButton] = useState(false);
  const [appChats, setAppChats] = useState<Array<ChatBox>>([]);

  const addToChats = ({ from, subject, text }: Omit<ChatBox, "id">) => {
    setAppChats((prev) => [
      ...prev,
      {
        id: nanoid(),
        from,
        subject,
        text,
      },
    ]);
  };

  const handleTextChange = async (newText: string) => {
    newText.trim();
    setUserInput((prev) => ({
      ...prev,
      text: newText,
    }));
  };
  const handleSelectChange = (newLanguage: LanguageCode) => {
    if (newLanguage.length <= 0) {
      toast.error("Please select your preferred language for Translation");
      setAppMode(appMode);
    }
    setAppMode("Translation");
    setUserInput((prev) => ({
      ...prev,
      language: newLanguage,
    }));
  };

  const verifyTextForSummary = async () => {
    if (
      !("translation" in self) ||
      !("createDetector" in (self.translation as any))
    ) {
      return;
    }
    const detector = await (self.translation as any).createDetector();
    const { detectedLanguage } = (await detector.detect(userInput.text))[0];

    if (detectedLanguage === "en") {
      setShowSummarizeButton(true);
    } else {
      setShowSummarizeButton(false);
    }
  };

  const handleDetection = async () => {
    setIsLoading(true);
    try {
      if (
        !("translation" in self) ||
        !("createDetector" in (self.translation as any))
      ) {
        toast.error(
          "Your browsers doesn't support Translation or Detection API"
        );
        return;
      }
      const detector = await (self.translation as any).createDetector();

      const { detectedLanguage, confidence } = (
        await detector.detect(userInput.text)
      )[0];

      addToChats({
        from: "Chucky",
        subject: "Language Detection:",
        text: `   
        ${(confidence * 100).toFixed(
          1
        )}% sure that this is ${languageTagToHumanReadable(
          detectedLanguage,
          "en"
        )}`,
      });
    } catch (error) {
      toast.error("An error occurred, please try again");
      console.error(`ERROR: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranslation = async () => {
    setIsLoading(true);
    const supportedLanguages = countryOptions.map((country) => country.code);
    const translation = (self as any).translation;

    try {
      if (
        translation &&
        "createTranslator" in translation &&
        "createDetector" in translation
      ) {
        const detector = await translation.createDetector();
        const detectionResults = await detector.detect(userInput.text);
        const sourceLanguage = detectionResults[0]?.detectedLanguage;

        if (!supportedLanguages.includes(sourceLanguage)) {
          addToChats({
            from: "Chucky",
            text: `Currently, only English, Portuguese, French, Russian, Turkish and Spanish Translations are supported.`,
          });
          return;
        }
        const translator = await translation.createTranslator({
          sourceLanguage,
          targetLanguage: userInput.language,
        });

        const translateText = await translator.translate(userInput.text);
        addToChats({
          from: "Chucky",
          subject: `Translating ${languageTagToHumanReadable(
            sourceLanguage,
            "en"
          )}  ↔ ${languageTagToHumanReadable(userInput.language, "en")}:`,
          text: translateText,
        });
      } else {
        toast.error("Translation API is not supported in your browser.");
      }
    } catch (error) {
      toast.error(
        "An error occurred while translating your text, please try again"
      );
      console.error(`ERROR: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSummary = async () => {
    setIsLoading(true);
    const ai = (self as any).ai;
    const { available } = await ai.summarizer.capabilities();
    let summarizer;
    if (available === "no") {
      toast.error("Summarize API is not supported in your browser.");
      return;
    }
    try {
      summarizer = await ai.summarizer.create(summaryOptions);

      if (available === "after-download") {
        summarizer.addEventListener("downloadprogress", (e: any) => {
          console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
        });

        // console.log("Waiting for summarizer model to be ready...");
        await summarizer.ready;
        // console.log("Summarizer model is ready!");
      }

      const summary = await summarizer.summarize(userInput.text);

      addToChats({
        from: "Chucky",
        subject: `Text Summary:`,
        text: summary,
      });
    } catch (error) {
      console.error(`ERROR: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitText = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const textareaInput = userInput.text.trim();

    if (textareaInput.length <= 0) {
      toast.error(`Please provide a text for ${appMode} API`);
      return;
    }
    if (appMode === "Summary" && textareaInput.length < 150) {
      toast.error(
        "Your text must be at least 150 characters to generate a Summary"
      );
      return;
    }

    addToChats({
      from: "User",
      text: userInput.text,
    });
    setUserInput((prev) => ({
      ...prev,
      text: "",
    }));
    if (appMode === "Detection") {
      await handleDetection();
    } else if (appMode === "Translation") {
      await handleTranslation();
    } else {
      await handleSummary();
    }
  };

  useEffect(() => {
    const verifySummary = async () => {
      if (userInput.text.length >= 150) {
        await verifyTextForSummary();
      } else {
        if (appMode === "Summary") {
          setAppMode("Detection");
        }
        setShowSummarizeButton(false);
      }
    };
    verifySummary();
  }, [userInput.text]);

  return (
    <AppContext.Provider
      value={{
        appMode,
        isLoading,
        appChats,
        userInput,
        showSummarizeButton,
        addToChats,
        handleTextChange,
        handleSelectChange,

        setAppMode,
        handleSubmitText,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within a AppProvider");
  }
  return context;
};

export default AppProvider;
