import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const BabyDailies = () => {
  return <>This is the baby dailies page.</>;
};

export default BabyDailies;

export const getServerSideProps = withPageAuthRequired();
