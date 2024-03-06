import axios from "axios";

function getToken() {
  return localStorage.getItem("token");
}

const apiClient = axios.create({
  baseURL: "http://43.201.184.37/",
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export async function sendRequest(endpoint: string, method = "get", data: any) {
  try {
    const response = await apiClient({
      method: method,
      url: endpoint,
      data: data,
    });
    return response.data;
  } catch (error) {
    console.error("error message:", error);
    throw error;
  }
}

// 예시 사용법
// sendRequest('endpoint', 'post', { key: 'value' })
//   .then(data => console.log(data))
//   .catch(error => console.error(error));
