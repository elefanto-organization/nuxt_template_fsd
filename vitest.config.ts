import { fileURLToPath } from "url";
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
const initPathAliases = () => {
  const paths = [
    { relative: "utils", path: "./shared/utils" },
    { relative: "@", path: "./" },
    { relative: "services", path: "./shared/services" },
    { relative: "config", path: "./shared/config" },
    { relative: "types", path: "./shared/types" },
    { relative: "shared", path: "./shared" },
    { relative: "pages", path: "./pages" },
    { relative: "entities", path: "./entities" },
    { relative: "features", path: "./features" },
    { relative: "app", path: "./app" },
    { relative: "widgets", path: "./widgets" },
    { relative: "processes", path: "./processes" },
  ];

  return paths.map((item) => ({
    find: item.relative,
    replacement: fileURLToPath(new URL(item.path, import.meta.url)),
  }));
};
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
  },
  resolve: {
    alias: initPathAliases(),
  },
});
