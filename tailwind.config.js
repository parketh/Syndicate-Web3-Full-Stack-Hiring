module.exports = {
    purge: { content: ["./src/**/*.js"], safelist: ["text-green-600", "text-red-600"] },
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
