import { createContext, useContext, useState, useEffect } from "react";
import { env } from "./env.mjs";
import { type Liff } from "@line/liff/exports.js";

type LiffContextValue = {
  liff: Liff;
};

export const liffContext = createContext({} as LiffContextValue);

const LiffProvider = ({ children }: { children: React.ReactNode }) => {
  const [liff, setLiff] = useState<Liff>();
  const [error, setError] = useState<string | object | null>();
  const [tokenIsValid, setTokenIsValid] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const liff = (await import("@line/liff")).default;

      await liff.init({ liffId: env.NEXT_PUBLIC_LIFF_ID });
      setLiff(liff);
    })().catch(setError);
  }, []);

  useEffect(() => {
    if (!liff) {
      return;
    }

    (async () => {
      await liff.ready;

      console.log("liff.ready");

      if (!liff.isLoggedIn()) {
        return liff.login();
      }

      // LIFF doesn't validate current access token, so we need to validate it manually.
      const profile = await liff.getProfile();
      if (profile.userId) {
        setTokenIsValid(true);
      }
    })().catch((error: string | object | null) => {
      console.error(error);

      if (error instanceof Error) {
        if (error.message === "The access token revoked") {
          return liff?.logout();
        }
      }

      setError(error);
    });
  }, [liff]);

  if (error) {
    return (
      <div className="grid h-screen items-center justify-center gap-2">
        <div className="flex flex-col gap-2">
          <div className="alert alert-error shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 flex-shrink-0 fill-none stroke-current"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Error occurred! Please reload the page.</span>
            </div>
          </div>
          {String(error)}
        </div>
      </div>
    );
  }

  if (liff?.isLoggedIn() && tokenIsValid) {
    return (
      <liffContext.Provider value={{ liff }}>{children}</liffContext.Provider>
    );
  }

  return <p>loading...</p>;
};

export default LiffProvider;

export const useLiff = () => {
  return useContext(liffContext);
};
