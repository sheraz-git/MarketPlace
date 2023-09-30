export const createAxiosConfig = (token) => {
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
};