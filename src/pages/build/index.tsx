import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type PermissionState = {
    canWriteMessage: boolean;
    message: string;
    background: string;
};

const LineMSBuild: NextPage = () => {
    const router = useRouter();

    const [state, setState] = useState<PermissionState>({
        canWriteMessage: false,
        message: "Loading...",
        background: "from-[#fbc2eb] to-[#a6c1ee]",
    });

    useEffect(() => {
        setState({
          canWriteMessage: true,
          message: `這是你的連結：\n ${router.query.text as string}`,
          background: "from-[#f78ca0] to-[#fe9a8b]",
        });
      }, [router.query.text]);
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