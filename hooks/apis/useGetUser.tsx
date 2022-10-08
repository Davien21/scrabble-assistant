import useSWR from "swr";
import { useEffect, useState } from "react";
import httpService from "../../services/httpService";
import { errorMessage } from "../../utils/helpers";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

let url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
url = `${url}/auth/me`;

function useGetUser() {
  const initialState: Array<any> = [];
  const [data, setData] = useState<any>(null);

  const fetcher = async (url: string) => {
    try {
      let response = await httpService.get(url);

      response = await response.data;
      let user = response.data;
      console.log(user);
    } catch (error) {
      const message = errorMessage(error);
      toast.error(message);
    }
  };

  const { data: allData, error, mutate } = useSWR(`${url}`, fetcher);

  useEffect(() => {
    if (allData) setData(allData);
    // console.log(allData);
  }, [allData]);

  return {
    data: data || initialState,
    isLoading: !error && !data,
    isEmpty: !data?.data,
    isError: error,
    mutate,
  };
}

export { useGetUser };
