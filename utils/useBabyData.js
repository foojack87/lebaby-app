import useSWR from 'swr';

function useBabyData() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR(`/api/flutter/`, fetcher);

  return {
    baby: data,
    babyLoading: isLoading,
    isError: error,
  };
}

export default useBabyData;
