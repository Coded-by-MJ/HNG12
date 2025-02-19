import { useApp } from "../provider/ContextProvider";
import { countryOptions } from "../utils/helper";
import { LanguageCode } from "../utils/types";
import { FaArrowUpLong } from "react-icons/fa6";
import { ImSpinner8 } from "react-icons/im";

function FormContainer() {
  const {
    userInput,
    isLoading,
    appMode,
    showSummarizeButton,
    handleSubmitText,
    setAppMode,
    handleSelectChange,
    handleTextChange,
  } = useApp();

  return (
    <form
      noValidate
      onSubmit={handleSubmitText}
      className="w-full flex flex-col gap-2 items-center justify-center rounded-4xl border-none p-3 bg-gray-700"
    >
      <div className="w-full">
        <label htmlFor="text-input" className="sr-only">
          Input Text for Detection, Translation or Summary
        </label>
        <textarea
          required
          name="text-input"
          id="text-input"
          value={userInput.text}
          disabled={isLoading}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder="Message Chucky"
          className="w-full disabled:cursor-not-allowed text-start resize-none bg-transparent outline-0 border-0 text-gray-300 text-[0.9rem] text-wrap field-sizing-content min-h-[60px]"
        ></textarea>
      </div>
      <div className="w-full justify-between items-center flex gap-3">
        <div className="flex-grow flex-wrap  gap-2 items-center flex">
          <div className="w-1/2 h-[30px]">
            <label htmlFor="language-options" className="sr-only"></label>
            <select
              name="language-options"
              id="language-options"
              className="text-gray-900 cursor-pointer bg-gray-300 text-xs rounded-3xl p-2 w-full"
              value={userInput.language}
              onChange={(e) => {
                const newLanguageCode = e.target.value as LanguageCode;
                handleSelectChange(newLanguageCode);
              }}
            >
              <option
                value=""
                className="bg-gray-900 h-full text-gray-3 "
                disabled
              >
                Select Language
              </option>
              {countryOptions.map((country) => (
                <option
                  key={country.code}
                  value={country.code}
                  className="bg-gray-900 text-gray-300"
                >
                  {country.language}
                </option>
              ))}
            </select>
          </div>

          {showSummarizeButton && (
            <button
              type="button"
              disabled={isLoading}
              onClick={() => setAppMode("Summary")}
              className={`${
                appMode === "Summary"
                  ? "bg-gray-600 text-gray-300"
                  : "bg-gray-300  text-gray-900"
              }   py-2 px-4 h-[40px] flex justify-center items-center  disabled:cursor-not-allowed hover:bg-gray-600 hover:text-gray-300 transition-colors cursor-pointer text-center border-1 rounded-3xl border-gray-900 text-sm md:text-base`}
            >
              Summarize
            </button>
          )}

          <button
            type="button"
            disabled={isLoading}
            onClick={() => {
              if (appMode === "Translation") {
                setAppMode("Detection");
              } else {
                handleSelectChange("en");
              }
            }}
            className={`${
              appMode === "Translation"
                ? "bg-gray-600 text-gray-300"
                : "bg-gray-300  text-gray-900"
            }   py-2 px-4 h-[40px] flex justify-center items-center  disabled:cursor-not-allowed hover:bg-gray-600 hover:text-gray-300 transition-colors cursor-pointer text-center border-1 rounded-3xl border-gray-900 text-sm md:text-base`}
          >
            Translate
          </button>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="size-[45px] flex justify-center items-center disabled:cursor-not-allowed hover:bg-gray-600 hover:text-gray-100 transition-colors cursor-pointer  text-center rounded-full  bg-gray-300 text-sm font-semibold"
        >
          {isLoading ? (
            <ImSpinner8 className="text-inherit md:size-[24px] size-[18px] animate-spin" />
          ) : (
            <FaArrowUpLong className="text-inherit md:size-[24px] size-[18px]" />
          )}
        </button>
      </div>
    </form>
  );
}
export default FormContainer;
