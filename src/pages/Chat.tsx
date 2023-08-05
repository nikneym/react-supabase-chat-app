import { ReactComponent as MessageBuble } from "../assets/message-buble.svg";
import { useEffect, useRef, useState } from "react";
import Bubble from "../components/Bubble";
import Editor from "../components/Editor";
import useChat from "../hooks/useChat";

interface DisplayedMessage {
  user?: string;
  content: string;
  our: boolean;
}

function Chat() {
  const { channel, isLoading } = useChat();

  if (!isLoading) {
    channel.on("broadcast", { event: "chat" }, (payload) => {
      if (payload.message) {
        setList([
          ...list,
          {
            content: payload.message,
            our: false,
          },
        ]);
      }
    });
  }

  const [list, setList] = useState<DisplayedMessage[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  // scroll to newly added message
  useEffect(() => {
    if (!ref.current || !ref.current.lastChild) return;
    const e = ref.current;

    (e.lastChild as HTMLDivElement).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [list]);

  // render a list of messages
  const messages = list.map((e, i) => {
    if (e.our) {
      const before = list[i - 1];
      if (before && before.our) {
        return (
          <Bubble user={e.user} text={e.content} our={e.our} followUp key={i} />
        );
      }
    }

    return <Bubble user={e.user} text={e.content} our={e.our} key={i} />;
  });

  return (
    <>
      <div className="relative flex items-center justify-center h-screen w-screen bg-indigo-200">
        <div className="relative flex flex-col m-auto w-full md:w-3/6 h-full md:h-5/6 bg-white overflow-hidden rounded-none md:rounded-lg shadow">
          <div className="flex flex-row bg-slate-600 text-white py-4 px-5 gap-x-1 items-center justify-start select-none">
            <MessageBuble className="block w-6 h-6" />
            <h1 className="font-semibold text-lg">Soppet</h1>
          </div>

          {/* list */}
          <div
            ref={ref}
            className="flex flex-col flex-1 items-start p-6 no-scrollbar overflow-x-hidden overflow-y-auto gap-y-1"
          >
            {messages}
          </div>

          {/* send new messages from here */}
          <Editor
            onSubmit={async (message) => {
              await channel.send({
                type: "broadcast",
                event: "chat",
                message: message,
              });

              setList([
                ...list,
                {
                  content: message,
                  our: true,
                },
              ]);
            }}
            disabled={isLoading}
          />
        </div>
      </div>
    </>
  );
}

export default Chat;
