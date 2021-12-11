import React, { useState, useEffect } from "react"
import NumberFormat from "react-number-format"

import { retrieveDaiBalance, retrieveUsdcBalance } from "./utils/retrieveBalances.js"
import { isAddress } from "./utils/isAddress.js"

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
        }
        checkIfValid()
    }, [address])

    const setSampleAddress = async (event) => {
        event.preventDefault()
        setAddress("0x1e3D6eAb4BCF24bcD04721caA11C478a2e59852D")
        setAlert({ message: " ", color: "black" })
    }

    const clearSampleAddress = async (event) => {
        event.preventDefault()
        setAddress("")
        setAlert({ message: " ", color: "black" })
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
                <span className="text-gray-600 text-2xl font-bold">Dai Address Balance Checker</span>
            </div>
            <div className="flex justify-center mt-8">
                <div className="grid grid-rows-2 justify-center bg-gray-200 p-8 rounded-lg ">
                    <div className="flex space-x-2">
                        <div className="font-semibold flex p-2 h-10 text-sm">Address</div>
                        <div className="w-96 outline-none flex space-x-2 p-2 px-3 bg-white rounded-md h-10 text-sm">
                            <input
                                type="text"
                                placeholder="Enter Ethereum address (0x...)"
                                className={`w-full outline-none rounded px-2 h-6 + ${
                                    isValid ? "bg-green-100" : "bg-white"
                                }`}
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                                autoFocus
                            />
                            <img
                                src="../clear.png"
                                alt="Clear"
                                className="w-2.5 h-2.5 my-2 hover:opacity-60"
                                onClick={clearSampleAddress}
                            />
                        </div>
                    </div>
                    <div className={`pt-1.5 ml-20 font-semibold text-xs ${"text-" + alert.color}`}>{alert.message}</div>
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
                <div className="grid grid-rows-2 justify-center bg-gray-200 p-8 rounded-lg">
                    <div className="font-semibold flex w-96 space-x-1">
                        <span>Dai Balance:</span>
                        <span>
                            <NumberFormat
                                value={daiBalance}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                                decimalScale={2}
                                fixedDecimalScale="true"
                            />
                        </span>
                    </div>
                    <div className="font-semibold flex w-96 space-x-1">
                        <span>USDC Balance:</span>
                        <span>
                            <NumberFormat
                                value={usdcBalance}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                                decimalScale={2}
                                fixedDecimalScale="true"
                            />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
