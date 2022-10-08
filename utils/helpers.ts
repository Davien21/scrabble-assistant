export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const ArrayMinusItem = (array: any[], item: any) => {
  return array.filter((i: any) => i !== item);
};

export const errorMessage = (error: any) => {
  if (error.response.data?.message.includes("Can't send mail"))
    return "Error - 550, Please check if your email is valid";
  if (error.response.data?.message.includes("Jwt expired"))
    return "Login expired, please login again";
  return error.response.data?.message || "Something went wrong";
};

export const getAuthToken = () => {
  return localStorage.getItem("beima-auth-token") || "";
};
