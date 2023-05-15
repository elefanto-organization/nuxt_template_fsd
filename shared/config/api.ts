import axios from "axios";
import { RuntimeConfig } from "nuxt/schema";

const baseApiAbortController = newAbortSignal();
const authApiAbortController = newAbortSignal();

function newAbortSignal() {
  return new AbortController();
}

const getAxiosInstances = (config: RuntimeConfig) => {
  const baseApiInstance = axios.create({
    baseURL: config.public.apiURL,
    signal: baseApiAbortController.signal,
  });

  const authApiInstance = axios.create({
    baseURL: config.public.apiURL,
    signal: authApiAbortController.signal,
  });
  return {
    authApiInstance,
    baseApiInstance,
  };
};

export { authApiAbortController, baseApiAbortController, getAxiosInstances };
