const Web3 = require("web3")

const daiABI = require("../abi/dai")
const erc20ABI = require("../abi/erc20")

const daiContractAddress = "0x6b175474e89094c44da98b954eedeac495271d0f"
const usdcContractAddress = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"

export const retrieveDaiBalance = async (address) => {
    const provider = new Web3.providers.HttpProvider("https://cloudflare-eth.com/")
    const web3 = new Web3(provider)
    const contract = new web3.eth.Contract(daiABI, daiContractAddress)

    const balance = await contract.methods.balanceOf(address).call()
    const balanceInWei = web3.utils.fromWei(balance)

    return balanceInWei
}

export const retrieveUsdcBalance = async (address) => {
    const provider = new Web3.providers.HttpProvider("https://cloudflare-eth.com/")
    const web3 = new Web3(provider)
    const contract = new web3.eth.Contract(erc20ABI, usdcContractAddress)

    const balance = await contract.methods.balanceOf(address).call()

    return balance / 10 ** 6
}
