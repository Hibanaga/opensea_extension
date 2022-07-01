import "../styles/globals.css";
import Head from "next/head";
import { MoralisProvider } from "react-moralis";

//const appID = "MBMbzTAFSOFLfqYEqIH5AFLbFlFHD6b3mJbTglco";
//const serverURL = "https://7pnavm1iwjmp.usemoralis.com:2053/server";
const appID = "uQBh2S8NYX30SiwamOLfWc5ENYXLeARbVTZpNCeU";
const serverURL = "https://4h20jxp0bkwy.usemoralis.com:2053/server";

function MyApp({ Component, pageProps }) {
  <Head>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
    <meta name="msapplication-TileColor" content="#2b5797" />
    <meta name="theme-color" content="#ffffff" />
  </Head>;
  return (
    <MoralisProvider serverUrl={serverURL} appId={appID}>
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
