import { IResponse } from "interfaces";
import httpService from "./httpService";

const route = `/auth`;

export async function signupAPI(body: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  return httpService.post(`${route}/sign-up`, body) as unknown as IResponse;
}

export async function verifyEmailAPI(body: { email: string; token: string }) {
  return httpService.post(
    `${route}/verify-email`,
    body
  ) as unknown as IResponse;
}

export async function loginAPI(body: { email: string; password: string }) {
  return httpService.post(`${route}/sign-in`, body) as unknown as IResponse;
}

export async function getUserAPI(token: string) {
  return httpService.post(
    `${route}/me`,
    {},
    { headers: { authorization: token } }
  ) as unknown as IResponse;
}
