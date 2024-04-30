const { default: axios } = require("axios");

const axiosInstance = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosInstance as ApiClient };
