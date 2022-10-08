export const apiErrorMessage = (error: any) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (expectedError) {
    return error.response.data.message;
  }
  
  if (!expectedError) {
    return "An unexpected error occurred. Please try again later.";
  }
};
