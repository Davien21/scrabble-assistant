const APIFormat = (data: any, error: any, initialState: any = []) => {
  return {
    allData: data || initialState,
    isLoading: !error && !data,
    isEmpty: !data?.data,
    isError: error,
  };
};

export { APIFormat };
