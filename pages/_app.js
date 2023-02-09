import Head from "next/head";
import MainMenu from "../components/MainMenu";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <div className="axum-rs-container grid grid-cols-1 gap-0 md:grid-cols-12 md:gap-4">
        <aside className="">
          <MainMenu className="" />
        </aside>
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}
