import React from "react"
import Cookies from "js-cookie";

export const useUser = () => {
    const [user, setUser] = React.useState<string | null>(null)

    React.useEffect(() => {
        const user = Cookies.get('user') ?? null
        setUser(user)
    }, [])
    
    console.log("get User: " + user)
    return user ? JSON.parse(user) : null
}