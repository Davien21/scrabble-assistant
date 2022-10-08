import { IRTKQueryResponse } from "interfaces";
import { useState } from "react";
import { toast } from "react-toastify";
import { errorMessage } from "utils/helpers";

export function useMutationCall() {
  const [isLoading, setisLoading] = useState<boolean>(false);

  const handler = async (mutation: Function): Promise<IRTKQueryResponse> => {
    setisLoading(true);
    const res = await mutation();
    const { error, data } = { ...res } as IRTKQueryResponse;
    setisLoading(false);
    if (error) {
      toast.error(errorMessage(error));
    }
    if (data) {
      console.log(data);
    }
    return { error, data };
  };

  return { isLoading, handler } as {
    isLoading: boolean;
    handler: Function;
  };
}
