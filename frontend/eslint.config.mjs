import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import babelParser from "@babel/eslint-parser";
//import { fileURLToPath } from 'url';
//import { dirname } from require('path');
//const filename = fileURLToPath(import.meta.env);
//const __dirName = dirname(filename);
export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: {...globals.node, ...globals.browser}, parser: babelParser, parserOptions: { requireConfigFile: false, babelOptions: { babelrc: true, configFile: false, presets: ["@babel/preset-env", "@babel/preset-react"], } } },   },
  pluginReact.configs.flat.recommended,
]);
