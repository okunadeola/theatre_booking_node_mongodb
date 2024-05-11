/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { createContext } from "react";



// const storage = window.localStorage.getItem('wesabi-auth-session')
export const userContext = createContext()




const UserContext = ({children})=>{
    // const [userData, setUserData] = useState(JSON.parse(storage))
    const [userData, setUserData] = useState(() => {
        // Get data from localStorage, or use default values
        const storedData = localStorage.getItem('wesabi-auth-session');
        return storedData ? JSON.parse(storedData) : null;
      })



    const setCurrentUser = (data)=>{
        setUserData(data)
    }


    useEffect(() => {
        localStorage.setItem('wesabi-auth-session', JSON.stringify(userData))
    }, [userData])
    



    return (
        <userContext.Provider value={{userData, setCurrentUser}}>
            {children}
        </userContext.Provider>
    )

}


export default UserContext