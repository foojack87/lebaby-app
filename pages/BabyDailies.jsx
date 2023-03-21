import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useUser, useSetUser } from '@/context/UserContext';
import { useEffect } from 'react';

const BabyDailies = () => {
  return <>babydailies</>;
};

export default BabyDailies;

export const getServerSideProps = withPageAuthRequired();
