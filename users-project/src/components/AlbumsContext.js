import React, { createContext, useState  } from 'react';



export const AlbumContext = createContext();

export const AlbumProvider = ({ children }) =>{
    const [Album, setAlbum] = useState("1");
    const changeAlbum = (id) => {
        setAlbum(id);
    };

    return <AlbumContext.Provider value={{Album, changeAlbum}}>
        { children }
    </AlbumContext.Provider>;

}; 