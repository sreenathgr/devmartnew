import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

type useFetchProps = {
  url: string;
  config?: AxiosRequestConfig;
};

const useFetch = <T,>({ url, config = {} }: useFetchProps) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Axios handles an empty config object perfectly
        const response = await axios.get(url, config);
        if (response.status === 200) {
          setData(response.data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // We stringify config.params so the effect only re-runs
    // when the actual values inside the object change
  }, [url, JSON.stringify(config.params)]);

  return { data, loading };
};

export default useFetch;
