const Web3 = require("web3")

const daiABI = require("../abi/dai")
const daiContractAddress = "0x6b175474e89094c44da98b954eedeac495271d0f"
const walletAddress = "0x1e3D6eAb4BCF24bcD04721caA11C478a2e59852D"

export const retrieveDaiBalance = async () => {
    const provider = new Web3.providers.HttpProvider("https://cloudflare-eth.com/")
    const web3 = new Web3(provider)
    const contract = new web3.eth.Contract(daiABI, daiContractAddress)

    const balance = await contract.methods.balanceOf(walletAddress).call()
    const balanceInWei = web3.utils.fromWei(balance)

    return balanceInWei
}
