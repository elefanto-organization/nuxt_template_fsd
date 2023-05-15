import { fileURLToPath } from "url";
import postcssNormalize from "postcss-normalize";
import { config as loadConfig } from "dotenv-flow";
// https://nuxt.com/docs/api/configuration/nuxt-config
loadConfig();
const getScssAdditionalData = (names: string[]) => {
  return names.reduce((acc, name) => {
    return `${acc}\n@import "@/shared/assets/scss/${name}";`;
  }, "");
};
const getPath = (path: string) =>
  fileURLToPath(new URL(`./${path}`, import.meta.url));
const initAliasPaths = () => {
  const pathNames = [
    "app",
    "entities",
    "features",
    "widgets",
    "shared",
    "processes",
  ];
  return pathNames.reduce(
    (result, pathName) => ({ ...result, [pathName]: getPath(pathName) }),
    {}
  );
}
export default defineNuxtConfig({
  css: ["/shared/assets/scss/main.scss", "sanitize.css"],
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
  runtimeConfig: {
    public: {
      apiURL: process.env.API_URL,
    },
  },
  alias: initAliasPaths(),
  dir: {
    assets: getPath("shared/assets"),
    plugins: getPath("app/plugins"),
    middleware: getPath("app/middleware"),
    layouts: getPath("app/layouts"),
    static: getPath("shared/static"),
    public: getPath("shared/public"),
  },
  modules: ["@vueuse/nuxt", "@intlify/nuxt3"],
  plugins: ["~/app/plugins/api.ts"],
  imports: {
    autoImport: false
  },
  intlify: {
    vueI18n: {
      locale: "ru",
      availableLocales: ["ru", "kk"],
      globalInjection: true,
      legacy: false,
      allowComposition: true,
    },
    localeDir: "app/locales",
  },
});
