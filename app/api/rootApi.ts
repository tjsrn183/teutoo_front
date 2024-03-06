import axios from "axios";
import { getCookie } from "cookies-next";
interface configTypes {
  method: string;
  url: string;
  data?: any;
  headers?: Record<string, string>;
  params?: any;
}
function getToken() {
  return getCookie("token");
}

const apiClient = axios.create({
  baseURL: "http://43.201.184.37/",
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      console.log("토큰이 있나유", token);
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
    console.log("시작한다아");
    const response = await apiClient(config);
    console.log("노오오오옹");
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
// 참고) ssr을 위한 prefetchQuery사용시 trainerMyPage => page.tsx 참고
