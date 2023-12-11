import { useEffect, useState } from "react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useLiff } from "~/LiffContext";
import { env } from "~/env.mjs";

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
    const sendMessage = async () => {
      const liffId = env.NEXT_PUBLIC_LIFF_ID;
      const profile = await liff.getProfile();
      const text = (router.query.text as string) || `用紅包砸我, 拜託`;
      const price = (router.query.price as string) || 1000;

      await liff.sendMessages([
        {
          type: "flex",
          altText: "LINE Pay",
          contents: {
            type: "bubble",
            size: "kilo",
            hero: {
              type: "image",
              url: "https://i.imgur.com/DyvejnH.png",
              size: "full",
              aspectMode: "cover",
              action: {
                type: "uri",
                label: "action",
                uri: `https://liff.line.me/${liffId}/messages?text=${text}`,
              },
              aspectRatio: "20:13",
            },
            body: {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "text",
                  // eslint-disable-next-line
                  // @ts-ignore
                  text: "LINE Pay",
                  weight: "bold",
                  size: "xl",
                  contents: [] as any,
                },
                {
                  type: "text",
                  text: `您已收到NT ${price}。（來自：${profile.displayName}）`,
                  wrap: true,
                },
              ],
            },
            footer: {
              type: "box",
              layout: "vertical",
              spacing: "sm",
              contents: [
                {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    {
                      type: "button",
                      style: "secondary",
                      height: "sm",
                      action: {
                        type: "uri",
                        label: "View details",
                        uri: `https://liff.line.me/${liffId}/messages?text=${text}`,
                      },
                    },
                  ],
                  backgroundColor: "#f6f6f6",
                  cornerRadius: "md",
                  width: "95%",
                },
                {
                  type: "separator",
                },
                {
                  type: "box",
                  layout: "horizontal",
                  contents: [
                    {
                      type: "box",
                      layout: "vertical",
                      contents: [
                        {
                          type: "image",
                          url: "https://i.imgur.com/UnXkgSL.png",
                          backgroundColor: "#60d16b",
                        },
                      ],
                      width: "16px",
                      height: "16px",
                      cornerRadius: "6px",
                      flex: 0,
                    },
                    {
                      type: "box",
                      layout: "horizontal",
                      contents: [
                        {
                          type: "text",
                          text: "LINE Pay",
                          flex: 0,
                          size: "xs",
                          color: "#9da5b3",
                        },
                        {
                          type: "text",
                          flex: 0,
                          text: ">",
                          size: "xs",
                          color: "#9da5b3",
                        },
                      ],
                      justifyContent: "space-between",
                    },
                  ],
                  margin: "sm",
                  alignItems: "center",
                  action: {
                    type: "uri",
                    label: "action",
                    uri: `https://liff.line.me/${liffId}/messages?text=${text}`,
                  },
                  spacing: "sm",
                },
              ],
              flex: 0,
            },
          },
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

    sendMessage().catch(console.log);
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
