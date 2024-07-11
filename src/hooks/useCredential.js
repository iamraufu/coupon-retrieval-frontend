import { useEffect, useState } from "react";
import users from '../data/user.json'

const useCredential = () => {

    const username = localStorage.getItem('username')
    const [user, setUser] = useState({});

    // getting userInfo from localStorage id and backend API
    const userData = () => {
        const fetchData = async () => {
            try {
                // const outlet = outlets.find(outlet => outlet.code.toLowerCase() === code.toLowerCase().trim() && outlet.code.toLowerCase() === code.toLowerCase().trim())
                // const isOutletExist = Boolean(outlet)
                // isOutletExist && setUser(outlet)
                const user = users.find(user => user.username.toLowerCase().trim() === username.username.toLowerCase().trim() && user.password.toLowerCase().trim() === username.password.toLowerCase().trim())
                const isUserExist = Boolean(user)
                isUserExist && setUser(user)

            } catch (error) {
                fetchData();
            }
        };
        fetchData();
    }

    // persist login
    useEffect(() => {
        if (username) {
            userData()
        } else {
            setUser({})
        }
        //eslint-disable-next-line
    }, [])

    // email
    const logOut = () => {
        localStorage.removeItem('username')
        setUser({})
    }

    return {
        user,
        setUser,
        logOut
    }
};

export default useCredential;