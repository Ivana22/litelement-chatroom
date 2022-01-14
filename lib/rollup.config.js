import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
const onwarn = function (warning) {
    if (warning.code === 'THIS_IS_UNDEFINED')
        return;
    console.warn(warning.message);
};
export const config = [
    {
        input: "./lib/src/chat-room/chat-room.js",
        output: {
            name: "main",
            file: "public/index.js",
            format: "umd",
        },
        plugins: [
            resolve({
                browser: true,
            }),
            commonjs(),
        ],
        onwarn
    },
];
export default config;
