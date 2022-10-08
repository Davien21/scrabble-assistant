import useSWR from "swr";
import { useEffect, useState } from "react";
import httpService from "../../services/httpService";
import { errorMessage } from "../../utils/helpers";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useLocalStorage } from "usehooks-ts";
import { IItem, IResponse } from "interfaces";
import { useDispatch } from "react-redux";
import { setContracts } from "store/slices/contractSlice";
import { setIsPageLoading } from "store/slices/UIStateSlice";

function useGetItem({
  contractId,
  itemId,
}: {
  contractId: string;
  itemId: string;
}) {
  let url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  url = `${url}/contracts/${contractId}/${itemId}`;
  const dispatch = useDispatch();
  const initialState = {
    _id: "",
    name: "",
    type: "function",
    inputs: [],
    outputs: [],
    description: "",
    isHidden: false,
    isNative: false,
    meta: [],
    linkedEvents: [],
  };
  const [authToken, setJwt] = useLocalStorage("beima-auth-token", "");

  const fetcher = async (url: string) => {
    let res = await fetch(url, { headers: { authorization: authToken } });
    return (res = await res.json());
  };
  const canFetch = !!contractId && !!itemId && !!authToken;

  const { data, error, mutate } = useSWR(`${url}`, canFetch ? fetcher : null);
  const isLoading = canFetch && !error && !data;

  useEffect(() => {
    dispatch(setIsPageLoading(isLoading));
  }, [isLoading, dispatch]);

  return {
    data: (data?.data || initialState) as IItem,
    isLoading,
    isEmpty: !data?.data,
    isError: error,
    mutate,
  };
}

export { useGetItem };
