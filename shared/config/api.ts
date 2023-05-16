import axios, { AxiosInstance } from "axios";
import { RuntimeConfig } from "nuxt/schema";

const baseApiAbortController = newAbortSignal();
const authApiAbortController = newAbortSignal();

function newAbortSignal() {
  return new AbortController();
}

const getAxiosInstances = (
  config: RuntimeConfig,
  cb?: (...args: any[]) => void
) => {
  const baseApiInstance = axios.create({
    baseURL: config.public.apiURL,
    signal: baseApiAbortController.signal,
  });

  const authApiInstance = axios.create({
    baseURL: config.public.apiURL,
    signal: authApiAbortController.signal,
  });
  authApiInstance.interceptors.response.use(
    (config) => config,
    axiosResponseRejectInterceptor(authApiInstance, cb)
  );
  return {
    authApiInstance,
    baseApiInstance,
  };
};
const axiosResponseRejectInterceptor =
  (axiosInstance: AxiosInstance, cb?: (...args: any[]) => void) =>
  (error: any) => {
    const originalConfig = error.config;
    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      cb?.();
      return axiosInstance(originalConfig);
    }
    return Promise.reject(error);
  };
export { authApiAbortController, baseApiAbortController, getAxiosInstances };
