import { defineNuxtPlugin } from "#app";
import { getAxiosInstances } from "~~/shared/config/api";
import { UserService } from "~~/shared/services/user";
import { BaseApi } from "~~/shared/services/base-api";

export default defineNuxtPlugin((app) => {
  const { baseApiInstance } = getAxiosInstances(app.$config);
  const baseApi = new BaseApi(baseApiInstance);
  return {
    provide: {
      userService: new UserService(baseApi),
    },
  };
});
