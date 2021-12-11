const axios = require("axios")

const apiUrl = "https://open.er-api.com/v6/latest/USD"

export const getExchangeRates = async () => {
    const response = await axios.get(apiUrl)
    return response.data.rates
}
