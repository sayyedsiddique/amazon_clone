export const getToken = () => {
  const user = localStorage.getItem("userInfo");
  const token = JSON.parse(user)

  return token?.token;
};

export const apiConfig = (url, method, data) => {
  const config = {
    method: method,
    url: url,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    data: data,
  };

  return config;
};
