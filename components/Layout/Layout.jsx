import NavBar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className="2xl:max-w-[1280px] w-full mx-auto">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
