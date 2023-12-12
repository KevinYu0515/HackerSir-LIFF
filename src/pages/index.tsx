import { type NextPage } from "next";
import { useRef } from "react";

const Home: NextPage = () => {

  const ref = useRef<HTMLInputElement>(null);

  const handleCopyLink = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const text: string = ref.current?.value || "";
    const button: HTMLButtonElement = event.currentTarget;
    if(button.name == 'message') window.location.href = 'build?text=' + text;
    return
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#fbc2eb] to-[#a6c1ee]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          想讓你的朋友發些有的沒的?
        </h1>

        <div className="flex w-full max-w-lg flex-col gap-4">
          <input
            type="text"
            placeholder="有的沒的"
            className="input-bordered input w-full"
            ref={ref}
          />
          <div className="btn-group w-full">
            <button name='message' onClick={handleCopyLink} className="btn w-1/3">文字訊息</button>
            <a href={`/create/hongbao`} className="btn-error btn w-1/3">紅包</a>
            <a href={`/create/linepay`} className="btn-success btn w-1/3">LinePay</a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
