import NavBar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import styles from '@/styles';
import { useUser } from '@auth0/nextjs-auth0/client';

const Layout = ({ children }) => {
  const { user, error, isLoading } = useUser();

  return (
    <>
      <NavBar />
      <main
        className={`${styles.innerWidth} mx-auto sm:px-16 px-6 min-h-[70vh]`}
      >
        <div className="object-cover sm:flex items-center">
          {user && <Sidebar />}
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
