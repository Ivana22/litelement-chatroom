import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";
import { config } from "./rollup.config.js";
const tasks = [...config];
tasks[0].plugins.push(serve({
    host: "localhost",
    port: 8000,
    contentBase: ["public"],
}));
tasks[0].plugins.push(livereload({ watch: "public" }));
export default tasks;
