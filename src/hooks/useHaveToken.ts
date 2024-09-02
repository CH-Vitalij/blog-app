const getToken = () => localStorage.getItem("token");

export const useHaveToken = () => {
  return getToken() ? true : false;
};
