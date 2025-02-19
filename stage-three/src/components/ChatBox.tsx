import { type ChatBox } from "../utils/types";
import { ChuckyLogo, UserLogo } from "./Logo";

function ChatBox({ chat }: { chat: ChatBox }) {
  const { text, subject, from } = chat;
  return (
    <article
      className={`${
        from === "User"
          ? "bg-gray-300 text-text-gray-900 self-end"
          : "bg-gray-600 text-gray-300 self-start  "
      } rounded-2xl relative p-4 max-w-1/2 text-wrap w-fit`}
    >
      {from === "User" ? (
        <UserLogo
          className={
            "size-[30px] p-1 bg-gray-300 absolute top-0 right-0 -translate-y-3"
          }
        />
      ) : (
        <ChuckyLogo
          className={
            "size-[30px] p-1 bg-gray-600 absolute top-0 left-0 -translate-y-3"
          }
        />
      )}
      {subject && (
        <strong className="text-base mt-0.5 text-inherit">{subject}</strong>
      )}
      <p className="text-base break-words mt-0.5 text-inherit">{text}</p>
    </article>
  );
}
export default ChatBox;
