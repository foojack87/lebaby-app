import Head from 'next/head';
import NavBar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import Footer from '@/components/Footer/Footer';

export default function Home(props) {
  return (
    <>
      <NavBar />
      <Hero />
      <Footer />
    </>
  );
}
