import useSWR from 'swr';

function useUserData() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR(`/api/user/`, fetcher);

  return {
    user: data,
    userLoading: isLoading,
    isError: error,
  };
}

export default useUserData;
