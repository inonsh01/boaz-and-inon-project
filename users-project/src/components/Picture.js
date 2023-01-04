import React, { useState, useEffect, useContext } from "react";
import { Link, Outlet } from 'react-router-dom'
import { AlbumContext } from './../components/AlbumsContext';


function Picture(params) {
    const getAlbum = useContext(AlbumContext)
    const [picture, setPicture] = useState([]);


    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/photos/?albumId=2${getAlbum.Album}`)
            .then((response) => response.json())
            .then((data) => {
                let picList = [];
                for (let i = 0; i < data.length; i++) {
                    picList.push(data[i].url);
                }
                setPicture(picList);
            })
    }, [getAlbum.Album]);
    return (
        <>
        <div>
            {picture.map((pic, index) => 
            <img key={index} src={picture[index]}alt="picture"/>
            )}
        </div>
        </>
    )
}

export default Picture;