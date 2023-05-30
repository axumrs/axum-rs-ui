import Head from "next/head";
import Layout from "../components/Layout/Layout";
import "../styles/globals.css";
import { MainMenuContextProvider } from "../contexts/MainMenuContext";
import { CartContextProvider } from "../contexts/CartContext";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || false;
  const enableBgVideo = false;
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          href="https://file.axum.rs/asset/logo.png"
        />
      </Head>

      <MainMenuContextProvider value={false}>
        <CartContextProvider value={[]}>
          {getLayout ? (
            getLayout(<Component {...pageProps} />, enableBgVideo)
          ) : (
            <Layout enableBgVideo={enableBgVideo}>
              <Component {...pageProps} />
            </Layout>
          )}
        </CartContextProvider>
      </MainMenuContextProvider>
    </>
  );
}
