import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLiff } from "~/LiffContext";
import * as line from '@line/bot-sdk';
const { MessagingApiClient, } = line.messagingApi;

type PermissionState = {
    canWriteMessage: boolean;
    message: string;
    background: string;
};

const channelAccessToken = 'JRW5NABtAZzyxrg9nWzAI9LFI+9hnskwaiwE6bKAsKkO07KHlHBXdHZc8HciBqnF2tcOhm+mre0OsHE2n9uwS0qv3PrHV4PHJIe9Yx7Ik3hve4rigeo+kDiP7BeOj6JikGhTXo5fFDDYB24iTyvVowdB04t89/1O/w1cDnyilFU=';
const userId = "Uacd83125262a3b77850e06ec151c5ec3";

const LineMSBuild: NextPage = () => {
    const { liff } = useLiff();
    const router = useRouter();

    const [state, setState] = useState<PermissionState>({
        canWriteMessage: false,
        message: "Loading...",
        background: "from-[#fbc2eb] to-[#a6c1ee]",
    });

    useEffect(() => {
        const handleSendMessage = async (message: string) => {

            const client = new MessagingApiClient({
                channelAccessToken
            });

            try {
              const textMessage: line.TextMessage = {
                type: 'text',
                text: message,
              };
        
              const messageRequest = {
                to: userId, 
                messages: [textMessage],
              };
              
              await client.pushMessage(messageRequest);        
            } catch (error) {
              console.error('Error sending message:', error);
            }
        };
    
        setState({
          canWriteMessage: true,
          message: "你的整人連結做好ㄌ，請回去 Line 看看",
          background: "from-[#f78ca0] to-[#fe9a8b]",
        });
    
        if (router.query.text) {
          const urlParams = new URLSearchParams(window.location.search);
          const text = urlParams.get('text')
          handleSendMessage(text as string).catch(console.log);
        }
      }, [liff, router.query.text]);
    return (
        <main
            className={
                "flex min-h-screen flex-col items-center justify-center bg-gradient-to-br " + state.background
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

export default LineMSBuild;