import { useEffect, useState } from "react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useLiff } from "~/LiffContext";

type PermissionState = {
  canWriteMessage: boolean;
  message: string;
  background: string;
};

const LinePayMessage: NextPage = () => {
  const { liff } = useLiff();
  const router = useRouter();

  const [state, setState] = useState<PermissionState>({
    canWriteMessage: false,
    message: "Loading...",
    background: "from-[#fbc2eb] to-[#a6c1ee]",
  });

  useEffect(() => {
    const sendMessage = async (message: string) => {
      await liff?.sendMessages([
        {
          type: "text",
          text: message,
        },
      ]);
    };

    const context = liff.getContext();

    console.log(context);

    // check if we have permission to write message
    if (!context?.scope.includes("chat_message.write")) {
      return setState({
        canWriteMessage: false,
        message: "好耶, 我們沒有權限幫你發訊息🎉",
        background: "from-[#43e97b] to-[#38f9d7]",
      });
    }

    // check if we are in external browser
    if (context?.type === "external") {
      return setState({
        canWriteMessage: true,
        message: "看來我們有權限幫你發訊息, 但你的瀏覽器不讓我們這麼做😩",
        background: "from-[#4facfe] to-[#00f2fe]",
      });
    }

    setState({
      canWriteMessage: true,
      message: "Oops, 我們替你發了幾則訊息出去, 下次記得要檢查授權喔😥",
      background: "from-[#f78ca0] to-[#fe9a8b]",
    });

    if (router.query.text) {
      sendMessage(router.query.text as string).catch(console.log);
    }
  }, [liff, router.query.text]);

  return (
    <main
      className={
        "flex min-h-screen flex-col items-center justify-center bg-gradient-to-br " +
        state.background
      }
    >
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          {state.message}
        </h1>
      </div>
    </main>
  );
};

export default LinePayMessage;
