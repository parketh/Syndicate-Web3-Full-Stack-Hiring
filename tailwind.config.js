module.exports = {
    content: ["./src/**/*.js"],
    theme: {
        fontFamily: {
            sans: ["Helvetica", "sans-serif"],
        },
        extend: {
            spacing: {
                88: "22rem",
                104: "26rem",
            },
        },
    },
    plugins: [require("@themesberg/flowbite/plugin")],
}
