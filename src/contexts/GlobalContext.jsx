import { useState } from "react";

import { createContext } from "react";

const GlobalContext = createContext();

const GlobalProvider= ({ children } ) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const contextValues= {
        user, setUser,
        isLoggedIn, setIsLoggedIn,
        isLoading, setIsLoading,
        message, setMessage,
        errorMessage, setErrorMessage
    };
    return ( 
        <GlobalContext.Provider value={contextValues}>
            {children}
        </GlobalContext.Provider>
    )


}

export { GlobalContext, GlobalProvider };