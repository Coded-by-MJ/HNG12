import { ChuckyLogo } from "./components/Logo";
import DisplayChatBox from "./components/DisplayChatBox";
import FormContainer from "./components/FormContainer";

function App() {
  return (
    <main className="bg-gray-900 p-4  relative md:p-8 flex flex-col gap-4 items-center justify-center w-full min-h-screen max-w-[1400px] mx-auto">
      <header className="flex flex-col items-center justify-center gap-2">
        <ChuckyLogo
          className={
            "size-[60px]  md:size-[80px] p-2 border-[1px] border-gray-300"
          }
        />
        <h1 className="font-semibold text-sm   md:text-base  text-center font-sans text-gray-300 italic">
          Hey, My Name is Chucky and I'm an AI-Powered Text Processing Interface
        </h1>
      </header>
      <section className="gap-2 rounded-4xl p-2 flex flex-col justify-between items-center h-[600px] border-gray-300 border-2 w-full max-w-[700px]">
        <div className="flex w-full  p-3 gap-1.5 items-center justify-between">
          <span className="rounded-4xl bg-gray-300 h-1 flex-grow"></span>
          <span className="rounded-full size-[6px] bg-gray-300"></span>
        </div>

        <DisplayChatBox />
        <FormContainer />
      </section>
    </main>
  );
}

export default App;
