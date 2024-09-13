import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để xử lý lỗi 401 và làm mới token
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 và yêu cầu chưa được thử lại
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token available");
        const newAccessToken = await refreshAccessToken(refreshToken);
        localStorage.setItem("accessToken", newAccessToken);
        apiClient.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Hàm làm mới token
const refreshAccessToken = async (refreshToken: string | null): Promise<string> => {
  if (!refreshToken) throw new Error("No refresh token available");

  const response = await axios.post("http://localhost:3000/refresh-token", {
    token: refreshToken,
  });

  return response.data.accessToken;
};

export default apiClient;
