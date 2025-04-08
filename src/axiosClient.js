import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://thanksl4.beget.tech/api",
});

axiosClient.interceptors.request.use((confirm) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  confirm.headers.Authorization = `Bearer ${token}`;
  return confirm;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      const { response } = error;
      if (response && response.status === 401) {
        localStorage.removeItem("ACCESS_TOKEN");
      }
    } catch (err) {
      console.log(err);
    }
    throw error;
  }
);
export default axiosClient;
