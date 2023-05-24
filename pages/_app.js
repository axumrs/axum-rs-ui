import Head from "next/head";
import Layout from "../components/Layout/Layout";
import "../styles/globals.css";
import { MainMenuContextProvider } from "../contexts/MainMenuContext";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || false;
  const enableBgVideo = false;
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <MainMenuContextProvider value={false}>
        {getLayout ? (
          getLayout(<Component {...pageProps} />, enableBgVideo)
        ) : (
          <Layout enableBgVideo={enableBgVideo}>
            <Component {...pageProps} />
          </Layout>
        )}
      </MainMenuContextProvider>
    </>
  );
}
