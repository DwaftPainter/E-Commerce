import Cookies from "js-cookie";

export const getAuthToken = async () => {
    if (Cookies.get('token')) {
        return Cookies.get('token')
    } else {
        return null
    }
}
