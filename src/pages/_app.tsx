import Head from "next/head";
import { type AppType } from "next/dist/shared/lib/utils";
import LiffProvider from "~/LiffContext";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Hackersir LIFF demo</title>
        <meta
          name="description"
          content="How hackers can use LIFF to hack your LINE account"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LiffProvider>
        <Component {...pageProps} />
      </LiffProvider>
    </>
  );
};

export default MyApp;
