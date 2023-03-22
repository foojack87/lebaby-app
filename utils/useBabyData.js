import useSWR from 'swr';
import useUserData from './useUserData';

function useBabyData() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { user } = useUserData();
  const { data, error, isLoading } = useSWR(`/api/flutter/`, fetcher);

  const babyData =
    data && user && data.filter((baby) => baby.user.id === user.id);

  return {
    baby: babyData,
    isLoading,
    isError: error,
  };
}

export default useBabyData;
