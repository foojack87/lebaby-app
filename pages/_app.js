import Head from 'next/head';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>LeBaby App // Track your babies activity.</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
