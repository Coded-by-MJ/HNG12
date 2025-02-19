import { useApp } from "../provider/ContextProvider";
import ChatBox from "./ChatBox";

function DisplayChatBox() {
  const { appChats } = useApp();
  return (
    <section
      className="h-[400px] flex flex-col px-2 py-4 w-full scrollbar-thumb-gray-300 scrollbar-thin scrollbar-track-gray-600  scrollbar-thumb-rounded-full scrollbar-track-rounded-full
  overflow-y-auto"
    >
      <div className="flex mt-auto h-fit flex-col gap-6 w-full ">
        {appChats.map((chat) => (
          <ChatBox key={chat.id} chat={chat} />
        ))}
      </div>
    </section>
  );
}
export default DisplayChatBox;
