module.exports = {
    content: ["./src/**/*.js"],
    theme: {
        extend: {
            spacing: {
                92: "23rem",
                104: "26rem",
            },
        },
    },
    plugins: [require("@themesberg/flowbite/plugin")],
}
