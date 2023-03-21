import Head from 'next/head';
import useUserData from '@/utils/useUserData';
import { useSetUser, useUser } from '../context/UserContext';
import { useEffect } from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { UserProvider as AtlasUserProvider } from '../context/UserContext';
import Layout from '@/components/Layout/Layout';
import '@/styles/globals.css';

export default function App(props) {
  const { Component, pageProps } = props;

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
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AtlasUserProvider>
      </UserProvider>
    </>
  );
}
