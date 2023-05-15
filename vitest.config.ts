import { fileURLToPath } from "url";
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
const initPathAliases = () => {
  const paths = [
    { relative: "utils", path: "./src/utils" },
    { relative: "@", path: "./src" },
    { relative: "components", path: "./src/components" },
    { relative: "services", path: "./src/services" },
    { relative: "config", path: "./src/config" },
    { relative: "types", path: "./src/types" },
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
