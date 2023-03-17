import NavBar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import styles from '@/styles';

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className={`${styles.innerWidth} mx-auto sm:px-16 px-6`}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
