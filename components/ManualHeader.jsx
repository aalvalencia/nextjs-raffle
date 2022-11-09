import { useMoralis } from "react-moralis"
import { useEffect } from "react"

export default function Header() {
    const { enableWeb3, account, isWeb3Enabled, deactivateWeb3, Moralis, isWeb3EnableLoading } =
        useMoralis()

    //runs function and auto render
    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
            }
        }
        //enableWeb3()
    }, [isWeb3Enabled]) //args (function, [array args]) runs function whenever values changes in arrar args

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null account found")
            }
        })
    }, [])
    return (
        <div>
            {account ? (
                <div>
                    Connected to {account.slice(0, 6)}...{account.slice(account.length - 4)}
                </div>
            ) : (
                <button
                    onClick={async () => {
                        await enableWeb3() //connect to metamask
                        //check if metamask is connected add item to local storage
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem("connected", "injected")
                        }
                    }}
                    disabled={isWeb3EnableLoading} //disable the button after click/loading
                >
                    Connect
                </button>
            )}
        </div>
    )
}
