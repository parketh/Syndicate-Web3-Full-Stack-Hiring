const Web3 = require("web3")

export const isAddress = async (address) => {
    const provider = new Web3.providers.HttpProvider("https://cloudflare-eth.com/")
    const web3 = new Web3(provider)
    const isAddress = await web3.utils.isAddress(address)
    return isAddress
}
