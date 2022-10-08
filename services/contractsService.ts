import { IContract, IItem, IResponse } from "interfaces";
import httpService from "./httpService";

const route = `/contracts`;

export async function uploadContractsAPI(body: IContract[], token: string) {
  return httpService.post(
    `${route}/upload
  `,
    body,
    { headers: { authorization: token } }
  ) as unknown as IResponse;
}

export async function getContractsAPI(token: string) {
  return httpService.get(`${route}`, {
    headers: { authorization: token },
  }) as unknown as IResponse;
}

export async function updateContract(body: any, token: string) {
  const _id = body._id;
  return httpService.put(`${route}/${_id}`, body, {
    headers: { authorization: token },
  }) as unknown as IResponse;
}

export async function updateContractItem(
  contractId: string,
  body: any,
  token: string
) {
  const itemId = body._id;
  return httpService.put(`${route}/${contractId}/${itemId}`, body, {
    headers: { authorization: token },
  }) as unknown as IResponse;
}

export async function toggleLinkEvent(
  contractId: string,
  itemId: string,
  body: any,
  token: string
) {
  return httpService.patch(`${route}/${contractId}/${itemId}/event`, body, {
    headers: { authorization: token },
  }) as unknown as IResponse;
}

export async function publishContract(contractId: string, token: string) {
  return httpService.patch(
    `${route}/publish/${contractId}`,
    {},
    {
      headers: { authorization: token },
    }
  ) as unknown as IResponse;
}
