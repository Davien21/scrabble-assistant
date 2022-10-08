import useSWR from "swr";
import { useEffect, useState } from "react";
import httpService from "../../services/httpService";
import { errorMessage } from "../../utils/helpers";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useLocalStorage } from "usehooks-ts";
import { IContract, IResponse } from "interfaces";
import { useDispatch } from "react-redux";
import { setContracts } from "store/slices/contractSlice";
import { setIsPageLoading } from "store/slices/UIStateSlice";

let url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
url = `${url}/contracts`;

function useGetContracts() {
  const dispatch = useDispatch();
  const initialState: IContract[] = [];
  const [authToken, setJwt] = useLocalStorage("beima-auth-token", "");

  const fetcher = async (url: string) => {
    let res = await fetch(url, { headers: { authorization: authToken } });
    return (res = await res.json());
  };

  const { data, error, mutate } = useSWR(`${url}`, authToken ? fetcher : null);
  const isLoading = !!authToken && !error && !data;

  useEffect(() => {
    dispatch(setIsPageLoading(isLoading));
  }, [isLoading, dispatch]);
  useEffect(() => {
    // console.log(data);
  }, [data]);
  return {
    data: (data?.data || initialState) as IContract[],
    isLoading,
    isEmpty: !data?.data,
    isError: error,
    mutate,
  };
}

export { useGetContracts };
