import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type PermissionState = {
    canWriteMessage: boolean;
    type: string;
    message: string;
    background: string;
};

interface LinkType{
  "messages": string;
  "hongbao": string;
  "linepay": string;
}

// 創建一個符合介面的物件
const type_collection: LinkType = {
  "messages": '文字訊息',
  "hongbao": 'Line Pay 紅包',
  "linepay": 'Line Pay',
};

const LineMSBuild: NextPage = () => {
    const router = useRouter();

    const [state, setState] = useState<PermissionState>({
        canWriteMessage: false,
        type: "Nothing",
        message: "Loading...",
        background: "from-[#fbc2eb] to-[#a6c1ee]",
    });

    useEffect(() => {
        const text = encodeURIComponent(router.query.text as string)
        if(router.query.type == 'messages'){
          setState({
            canWriteMessage: true,
            type: type_collection[router.query.type],
            message: `https://liff.line.me/2000964921-pXkanzYw/messages?text=${text}`,
            background: "from-[#f78ca0] to-[#fe9a8b]",
          });
        }
        if(router.query.type == 'hongbao'){
          setState({
            canWriteMessage: true,
            type: type_collection[router.query.type],
            message: `https://liff.line.me/2000964921-pXkanzYw/create/hongbao?text=${text}`,
            background: "from-[#f78ca0] to-[#fe9a8b]",
          });
        }
        if(router.query.type == 'linepay'){
          setState({
            canWriteMessage: true,
            type: type_collection[router.query.type],
            message: `https://liff.line.me/2000964921-pXkanzYw/create/linepay?text=${text}`,
            background: "from-[#f78ca0] to-[#fe9a8b]",
          });
        }
      }, [router.query.type, router.query.text]);
    return (
        <main
            className={
                "flex min-h-screen flex-col items-center justify-center bg-gradient-to-br " + state.background
            }
        >
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                <h5 className="font-extrabold tracking-tight text-white">
                  <p className="">這是你的{state.type}連結🎉</p>
                  <a href={`${state.message}`}>{state.message}</a>
                </h5>
            </div>
        </main>
    );
};

export default LineMSBuild;