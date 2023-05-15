import { getAxiosInstances } from "config/api";
import { UserService } from "services/user";
import { BaseApi } from "services/base-api";

export default defineNuxtPlugin((app) => {
  const { baseApiInstance } = getAxiosInstances(app.$config);
  const baseApi = new BaseApi(baseApiInstance);
  return {
    provide: {
      userService: new UserService(baseApi),
    },
  };
});
