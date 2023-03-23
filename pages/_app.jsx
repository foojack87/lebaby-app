import Head from 'next/head';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { UserProvider as AtlasUserProvider } from '../context/UserContext';
import Layout from '@/components/Layout/Layout';
import '@/styles/globals.css';
import useBabyData from '@/utils/useBabyData';
import useUserData from '@/utils/useUserData';

export default function App(props) {
  const { Component, pageProps } = props;
  const { baby, babyLoading } = useBabyData();
  const { user, userLoading } = useUserData();

  return (
    <>
      <Head>
        <title>LeBaby App // Track your babies activity.</title>
        <meta
          name="description"
          content="input and keep track of your babies daily growth and activities"
        />
      </Head>
      <UserProvider>
        <AtlasUserProvider>
          <Layout babies={baby} users={user}>
            <Component
              {...pageProps}
              babies={baby}
              users={user}
              babyLoading={babyLoading}
              userLoading={userLoading}
            />
          </Layout>
        </AtlasUserProvider>
      </UserProvider>
    </>
  );
}
