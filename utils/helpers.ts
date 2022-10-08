import {
  IContract,
  IEvent,
  IWithActiveState,
  IFunction,
  IItem,
  IAuth,
  IResponse,
} from "interfaces";
import _ from "lodash";

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getEventsWithActiveState = (
  contract: IContract,
  functionName: string
) => {
  const linkedEvents = getLinkedEvents(contract, functionName);
  const allEvents = getAllEvents(contract);

  const unlinkedEvents = allEvents.map((e: IItem) => {
    const isActive = linkedEvents.includes(e.name);
    return { name: e.name, isActive };
  });
  return (unlinkedEvents as IWithActiveState[]) || [];
};

export const getLinkedEvents = (contract: IContract, functionId: string) => {
  return (
    contract.data.find((c: IItem) => c._id === functionId)?.linkedEvents || []
  );
};

export const getAllEvents = (contract: IContract | undefined) => {
  return contract?.data.filter((e: IItem) => e.type === "event") || [];
};

export const ArrayMinusItem = (array: any[], item: any) => {
  return array.filter((i: any) => i !== item);
};

export const getdescriptionFromContract = (
  contract: IContract | undefined,
  functionName: string
) => {
  return (
    contract?.data.find((c: IItem) => c.name === functionName)?.description ||
    ""
  );
};

export const getUserInitials = (user: IAuth["user"]) => {
  const firstName = user.firstName || "";
  const lastName = user.lastName || "";
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
  return initials.toUpperCase();
};

export const getFullName = (user: IAuth["user"]) => {
  const firstName = user.firstName || "";
  const lastName = user.lastName || "";
  return `${capitalize(firstName)} ${capitalize(lastName)}`;
};

export const errorMessage = (error: any) => {
  if (error.response.data?.message.includes("Can't send mail"))
    return "Error - 550, Please check if your email is valid";
  if (error.response.data?.message.includes("Jwt expired"))
    return "Login expired, please login again";
  return error.response.data?.message || "Something went wrong";
};

export const getItemById = (contract: IContract, _id: string) => {
  let index = contract.data.findIndex((x) => x._id === _id);
  return contract.data[index];
};

export const getFunctionById = (contract: IContract, _id: string) => {
  let index = contract.data.findIndex(
    (x) => x._id === _id && x.type === "function"
  );
  return contract.data[index];
};

export const getFunctionIndex = (contract: IContract, _id: string) => {
  let index = contract.data.findIndex(
    (x) => x._id === _id && x.type === "function"
  );
  return index;
};

export const getEventById = (contract: IContract, _id: string) => {
  let index = contract.data.findIndex(
    (x) => x._id === _id && x.type === "event"
  );
  return contract.data[index];
};

export const apiResponse = (result: IResponse) => {
  const { error, response } = result;
  console.log(error, response);
  if (error) return { error: error.response.data, response: null };
  if (response) return { error, data: response.data };
};

export const getAuthToken = () => {
  return localStorage.getItem("beima-auth-token") || "";
};

export const deepClone = (object: any) => {
  return JSON.parse(JSON.stringify(object));
  return _.cloneDeep(object);
};
