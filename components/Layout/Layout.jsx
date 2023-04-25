import NavBar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import { useUser } from '@auth0/nextjs-auth0/client';

const Layout = ({ children, users, userLoading }) => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="max-w-screen-lg w-full mx-auto px-6 flex-grow">
          <div className="sm:flex justify-between">
            {user && (
              <Sidebar users={users} userLoading={userLoading} error={error} />
            )}
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
