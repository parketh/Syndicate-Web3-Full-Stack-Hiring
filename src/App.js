import React, { useState, useEffect } from "react"
import NumberFormat from "react-number-format"

import { retrieveDaiBalance, retrieveUsdcBalance } from "./utils/retrieveBalances.js"
import { isAddress } from "./utils/isAddress.js"
import { getExchangeRates } from "./utils/getExchangeRates.js"

const sampleAddress = "0xa1D8d972560C2f8144AF871Db508F0B0B10a3fBf"

const App = () => {
    const [address, setAddress] = useState("")
    const [isValid, setIsValid] = useState("")
    const [alert, setAlert] = useState({ message: "", color: "black" })
    const [daiBalance, setDaiBalance] = useState("n/a")
    const [usdcBalance, setUsdcBalance] = useState("n/a")
    const [dispCurr, setDispCurr] = useState("$")
    const [rate, setRate] = useState(1)

    useEffect(() => {
        async function checkIfValid() {
            const isValidResult = await isAddress(address)
            setIsValid(isValidResult)
            setAlert({ message: " ", color: "black" })
            setDaiBalance("n/a")
            setUsdcBalance("n/a")
        }
        checkIfValid()
    }, [address])

    const setSampleAddress = async (event) => {
        event.preventDefault()
        setAddress(sampleAddress)
        setAlert({ message: "", color: "black" })
        setDaiBalance("n/a")
        setUsdcBalance("n/a")
    }

    const clearSampleAddress = async (event) => {
        event.preventDefault()
        setAddress("")
        setAlert({ message: "", color: "black" })
        setDaiBalance("n/a")
        setUsdcBalance("n/a")
    }

    const checkAddressBalance = async (event) => {
        event.preventDefault()
        if (isValid) {
            setAlert({ message: "Valid address! 👍", color: "green-600" })
            const retrievedDaiBalance = await retrieveDaiBalance(address)
            setDaiBalance(retrievedDaiBalance)
            const retrievedUsdcBalance = await retrieveUsdcBalance(address)
            setUsdcBalance(retrievedUsdcBalance)
        } else {
            setAlert({ message: "Invalid address! 😔 Please try again.", color: "red-600" })
        }
    }

    const toggleDispCurrency = async () => {
        if (dispCurr === "$") {
            setDispCurr("£")
            const rates = await getExchangeRates()
            setRate(rates.GBP)
        } else {
            setDispCurr("$")
            setRate(1)
        }
    }

    return (
        <div className="w-full overflow-auto flex flex-col justify-center items-center bg-white">
            <div className="flex justify-center p-4 border-b-2 text-center w-full">
                <span className="text-gray-700 text-xl sm:text-2xl font-bold w-full">Stablecoin Balance Checker</span>
            </div>
            <div className="h-auto w-screen space-y-2 px-5 py-5 max-w-lg items-center justify-center">
                <div className="flex justify-center pt-4 w-full">
                    <div className="flex flex-col space-y-2 justify-center bg-gray-200 rounded-lg w-full p-4">
                        <div className="flex justify-between">
                            <div className="font-semibold flex text-sm">Address</div>
                            <div className={`focus-within:font-semibold text-xs pt-1 ${"text-" + alert.color}`}>
                                {alert.message}
                            </div>
                        </div>
                        <div className="flex p-2 px-3 bg-white rounded-md h-10 w-full justify-between space-x-3">
                            <input
                                type="text"
                                placeholder="Enter Ethereum address (0x...)"
                                className={`outline-none border-0 focus:ring-0 focus:outline-none rounded px-2 h-6 w-full + ${
                                    isValid ? "bg-blue-200" : "bg-white"
                                }`}
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                                autoFocus
                            />
                            <img
                                src="../clear.png"
                                alt="Clear"
                                className={`w-2.5 h-2.5 my-2 hover:opacity-50 cursor-pointer " + ${
                                    address === "" ? "hidden" : ""
                                }`}
                                onClick={clearSampleAddress}
                            />
                        </div>
                        <div className="flex flex-col space-y-3 pt-4">
                            <button
                                className="bg-gray-400 w-full px-3 p-1 rounded-md text-white h-10 hover:opacity-60"
                                onClick={setSampleAddress}
                            >
                                Use sample address
                            </button>
                            <button
                                className="bg-blue-600 w-full px-3 p-1 rounded-md text-white font-semibold h-10 hover:opacity-60"
                                onClick={checkAddressBalance}
                            >
                                Check address balance
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center pt-4 pb-12">
                    <div className="flex flex-col justify-center bg-gray-200 w-full p-4 rounded-lg text-gray-700 space-y-2">
                        <div className="text-center font-semibold mb-3">Wallet Balances</div>
                        <div className="flex justify-between">
                            <div className="flex space-x-2">
                                <img src="../dai.png" alt="dai" className="w-6 h-6" />
                                <span>Dai</span>
                            </div>
                            <span>
                                {daiBalance === "n/a" ? (
                                    daiBalance
                                ) : (
                                    <NumberFormat
                                        value={daiBalance * rate}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={dispCurr}
                                        decimalScale={2}
                                        fixedDecimalScale="true"
                                    />
                                )}
                            </span>
                        </div>
                        <div className="flex space-x-1 justify-between">
                            <div className="flex space-x-2">
                                <img src="../usdc.png" alt="usdc" className="w-6 h-6 p-0.5" />
                                <span>USDC</span>
                            </div>
                            <span>
                                {daiBalance === "n/a" ? (
                                    daiBalance
                                ) : (
                                    <NumberFormat
                                        value={usdcBalance * rate}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={dispCurr}
                                        decimalScale={2}
                                        fixedDecimalScale="true"
                                    />
                                )}
                            </span>
                        </div>
                        <div className="flex space-x-1 justify-between pt-4">
                            <span className="text-sm pt-1 font-semibold">Units</span>
                            <div className="flex space-x-2.5 text-gray-700">
                                <span className="pt-0.5 text-sm">$</span>
                                <label className="flex items-center cursor-pointer relative">
                                    <input
                                        type="checkbox"
                                        id="toggle-example"
                                        className="sr-only"
                                        value={dispCurr}
                                        onChange={() => toggleDispCurrency()}
                                    />
                                    <div className="toggle-bg bg-blue-600 border border-gray-200 h-6 w-11 rounded-full"></div>
                                    <span className="ml-3 text-sm">£</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center flex flex-col space-y-2 border-t-2 pt-6 w-full items-center">
                <span className="text-sm text-gray-400 w-64 sm:w-full">
                    Written by Park Yeung for the Syndicate Full Stack Engineering Test.
                </span>
                <span className="text-sm text-gray-400">
                    <a href="https://github.com/yeungparkhay" className="hover:text-gray-700">
                        GitHub
                    </a>
                    <span> | </span>
                    <a href="https://www.linkedin.com/in/park-yeung" className="hover:text-gray-700">
                        LinkedIn
                    </a>
                </span>
            </div>
        </div>
    )
}

export default App
