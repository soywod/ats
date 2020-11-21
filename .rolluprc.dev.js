import commonjs from "@rollup/plugin-commonjs";
import html from "rollup-plugin-generate-html-template";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

import {buildDir, extensions, outputESM, plugins} from "./.rolluprc.common.js";

export default {
  input: "src/index.ts",
  output: outputESM(),
  plugins: plugins([
    commonjs({extensions}),
    html({
      template: "src/index.html",
      target: `${buildDir}/index.html`,
      attrs: [`type="module"`],
    }),
    serve({
      contentBase: buildDir,
      port: process.env.PORT || 3000,
    }),
    livereload({
      watch: buildDir,
    }),
  ]),
};
