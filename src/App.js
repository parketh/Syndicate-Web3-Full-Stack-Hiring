import React, { useState, useEffect } from "react"
import NumberFormat from "react-number-format"

import { retrieveDaiBalance, retrieveUsdcBalance } from "./utils/retrieveBalances.js"
import { isAddress } from "./utils/isAddress.js"

const sampleAddress = "0xa1D8d972560C2f8144AF871Db508F0B0B10a3fBf"

const App = () => {
    const [address, setAddress] = useState("")
    const [isValid, setIsValid] = useState("")
    const [alert, setAlert] = useState({ message: " ", color: "black" })
    const [daiBalance, setDaiBalance] = useState("n/a")
    const [usdcBalance, setUsdcBalance] = useState("n/a")

    useEffect(async () => {
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
        setAlert({ message: " ", color: "black" })
        setDaiBalance("n/a")
        setUsdcBalance("n/a")
    }

    const clearSampleAddress = async (event) => {
        event.preventDefault()
        setAddress("")
        setAlert({ message: " ", color: "black" })
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

    return (
        <div className="h-screen bg-white">
            <div className="flex justify-center p-4 border-b-2">
                <span className="text-gray-600 text-2xl font-bold">Stablecoin Balance Checker</span>
            </div>
            <div className="flex justify-center mt-8">
                <div className="flex flex-col space-y-2 justify-center bg-gray-200 p-8 rounded-lg">
                    <div className="font-semibold flex text-sm">Address</div>
                    <div className="outline-none flex p-2 px-3 bg-white rounded-md h-10 text-sm w-104 justify-between">
                        <input
                            type="text"
                            placeholder="Enter Ethereum address (0x...)"
                            className={`outline-none rounded px-2 h-6 w-92 + ${isValid ? "bg-cyanLight" : "bg-white"}`}
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            autoFocus
                        />
                        <img
                            src="../clear.png"
                            alt="Clear"
                            className={`w-2.5 h-2.5 my-2 hover:opacity-50 " + ${address === "" ? "hidden" : ""}`}
                            onClick={clearSampleAddress}
                        />
                    </div>
                    <div className={`h-6 focus-within:font-semibold text-xs ${"text-" + alert.color}`}>
                        {alert.message}
                    </div>
                    <div className="flex space-x-2">
                        <button
                            className="bg-gray-400 w-full px-3 p-1 rounded-md text-white h-10 hover:opacity-60"
                            onClick={setSampleAddress}
                        >
                            Use sample address
                        </button>
                        <button
                            className="bg-cyan w-full px-3 p-1 rounded-md text-white font-semibold h-10 hover:opacity-60"
                            onClick={checkAddressBalance}
                        >
                            Check address balance
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <div className="flex flex-col justify-center bg-gray-200 p-8 rounded-lg text-gray-600 space-y-1 pb-12">
                    <div className="text-center font-semibold mb-3">Wallet Balances</div>
                    <div className="flex w-104 justify-between">
                        <div className="flex space-x-2">
                            <img src="../dai.png" alt="dai" className="w-6 h-6" />
                            <span>Dai</span>
                        </div>
                        <span>
                            {daiBalance === "n/a" ? (
                                daiBalance
                            ) : (
                                <NumberFormat
                                    value={daiBalance}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                    decimalScale={2}
                                    fixedDecimalScale="true"
                                />
                            )}
                        </span>
                    </div>
                    <div className="flex w-104 space-x-1 justify-between">
                        <div className="flex space-x-2">
                            <img src="../usdc.png" alt="usdc" className="w-6 h-6 p-0.5" />
                            <span>USDC</span>
                        </div>
                        <span>
                            {daiBalance === "n/a" ? (
                                daiBalance
                            ) : (
                                <NumberFormat
                                    value={usdcBalance}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                    decimalScale={2}
                                    fixedDecimalScale="true"
                                />
                            )}
                        </span>
                    </div>
                </div>

                <label for="toggle-example" class="flex items-center cursor-pointer relative mb-4">
                    <input type="checkbox" id="toggle-example" class="sr-only" />
                    <div class=" bg-gray-200 border border-gray-200 h-6 w-11 rounded-full"></div>
                    <span class="ml-3 text-gray-900 text-sm font-medium">Toggle me</span>
                </label>
            </div>
            <div className="text-center mt-20 flex flex-col space-y-2 border-t-2 pt-5">
                <span className="text-sm text-gray-400">
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
