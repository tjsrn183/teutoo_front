import axios from "axios";
import { getUserCookie } from "../utils/getUserCookie";
interface configTypes {
  method: string;
  url: string;
  data?: any;
  headers?: Record<string, string>;
  params?: any;
}

const apiClient = axios.create({
  baseURL: "http://43.201.184.37/",
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    let token = getUserCookie();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export async function sendRequest(
  endpoint: string,
  method: string = "get",
  data?: any,
  headers?: Record<string, string>,
) {
  const config: configTypes = {
    method: method,
    url: endpoint,
    headers: headers || {},
    data: data,
  };

  if (method.toLowerCase() === "get") {
    delete config["data"];
  }
  try {
    const response = await apiClient(config);
    return response.data;
  } catch (error) {
    console.error("error message:", error);

    throw error;
  }
}
// 예시 사용법
// sendRequest('endpoint', 'post', { key: 'value' })
//회원가입시
//sendRequest('join','post',~~);
// 참고) ssr을 위한 prefetchQuery사용시 trainerMyPage =>layout.tsx 참고
