import Head from 'next/head';
import NavBar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import Footer from '@/components/Footer/Footer';

export default function Home(props) {
  return (
    <>
      <Head>
        <title>LeBaby App // Track your babies activity.</title>
        <meta
          name="description"
          content="input and keep track of your babies daily growth and activities"
        />
      </Head>
      <NavBar />
      <Hero />
      <Footer />
    </>
  );
}
