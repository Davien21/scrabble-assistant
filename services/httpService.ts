import axios from "axios";
import { IResponse } from "interfaces";
import { toast } from "react-toastify";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

axios.interceptors.response.use(
  (response) => {
    return { error: null, response: response.data, meta: response };
  },
  (error) => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedError) {
      // toast.error("An unexpected error occurred.");
    }

    return { error, response: null };
  }
);

export function setJwt(jwt: string) {
  axios.defaults.headers.common["authorization"] = `Bearer ${jwt}`;
}

export function getJwt() {
  return localStorage.getItem("beima-auth-token") || "";
}

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
  setJwt,
  getJwt,
};

export default httpService;
