import useSWR from 'swr';
import { useUser, useSetUser } from '@/context/UserContext';

function useUserData() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/user/`, fetcher);

  // const setUser = useSetUser();
  // const userser = useUser();
  // setUser(data);
  // console.log(userser);

  return {
    user: data,
    isLoading,
    isError: error,
  };
}

export default useUserData;
