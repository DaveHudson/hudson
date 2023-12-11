// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "content" | "presets" | "plugins"> = {
  content: ["./src/app/**/*.tsx"],
  presets: [sharedConfig],
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};

export default config;
