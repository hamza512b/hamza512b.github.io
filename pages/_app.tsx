import "@/styles/globals.css";
import type { AppProps } from "next/app";

import ReactGA from "react-ga4";

ReactGA.initialize("G-T0Y0K9S566");
ReactGA.send("pageview");

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
