import React, { createContext, useState  } from 'react';



export const IdContext = createContext();

export const UserProvider = ({ children }) =>{
    const [myId, setMyId] = useState("1");
    const changeId = (id) => {
        setMyId(id);
    };

    return <IdContext.Provider value={{myId, changeId}}>
        { children }
    </IdContext.Provider>;

}; 

