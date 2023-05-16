import Head from "next/head";
import Layout from "../components/Layout/Layout";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || false;
  const enableBgVideo = false;
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {getLayout ? (
        getLayout(<Component {...pageProps} />, enableBgVideo)
      ) : (
        <Layout enableBgVideo={enableBgVideo}>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  );
}
