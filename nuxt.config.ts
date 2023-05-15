import { fileURLToPath } from "url";
import postcssNormalize from "postcss-normalize";
import { config as loadConfig } from "dotenv-flow";
// https://nuxt.com/docs/api/configuration/nuxt-config
loadConfig();
const getScssAdditionalData = (names: string[]) => {
  return names.reduce((acc, name) => {
    return `${acc}\n@import "@/assets/scss/${name}";`;
  }, "");
};
const getPath = (path: string) =>
  fileURLToPath(new URL(`./src/${path}`, import.meta.url));
export default defineNuxtConfig({
  css: ["@/assets/scss/main.scss", "sanitize.css"],
  vite: {
    css: {
      postcss: {
        plugins: [postcssNormalize()],
      },
      preprocessorOptions: {
        scss: {
          additionalData: getScssAdditionalData([
            "_variables.scss",
            "_mixins.scss",
            "_layout.scss",
            "_utils.scss",
            "_animations.scss",
          ]),
        },
      },
    },
  },
  srcDir: "./src",
  runtimeConfig: {
    public: {
      apiURL: process.env.API_URL,
    },
  },
  alias: {
    components: getPath("components"),
    pages: getPath("pages"),
    utils: getPath("utils"),
    types: getPath("types"),
    services: getPath("services"),
    config: getPath("config"),
  },
  dir: {
    assets: getPath("assets"),
    pages: getPath("pages"),
    plugins: getPath("plugins"),
    middleware: getPath("middleware"),
  },
  modules: ["@vueuse/nuxt", "@intlify/nuxt3"],
  plugins: ["~/plugins/api.ts"],
  intlify: {
    vueI18n: {
      locale: "ru",
      availableLocales: ["ru", "kk"],
      globalInjection: true,
      legacy: false,
      allowComposition: true,
    },
    localeDir: "locales",
  },
});
