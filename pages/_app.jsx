import Head from 'next/head';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Analytics } from '@vercel/analytics/react';
import Layout from '@/components/Layout/Layout';
import '@/styles/globals.css';
import useUserData from '@/utils/useUserData';

export default function App(props) {
  const { Component, pageProps } = props;
  const { user, userLoading, error } = useUserData();

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
        <Layout users={user} userLoading={userLoading} error={error}>
          <Component
            {...pageProps}
            users={user}
            userLoading={userLoading}
            error={error}
          />
        </Layout>
      </UserProvider>
      <Analytics />
    </>
  );
}
