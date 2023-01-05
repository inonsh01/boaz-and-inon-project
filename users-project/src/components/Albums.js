import React, { useState, useEffect, useContext } from "react";
import { Link, Outlet } from 'react-router-dom'
import { AlbumContext } from './AlbumsContext';
import { IdContext } from './userContext';


function Photos() {
    const getId = useContext(IdContext)
    const [albumsList, setAlbumsList] = useState([])
    const getAlbum = useContext(AlbumContext)



    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/albums?userId=${getId.myId}`)
            .then((response) => response.json())
            .then((data) => {
                let myList = [];
                for (let i = 0; i < 10; i++) {
                    myList.push(data[i].title);
                }
                myList.sort();
                setAlbumsList(myList);
            })
    }, []);

    const changeContextValue = (index) => {
        getAlbum.changeAlbum(index + 1)
        console.log("index", index);
        console.log("getAlbum.Album1:", getAlbum.Album);
    }
    return (<>

        <div className="talboms">
            <ul>{albumsList.map((item, index) =>
                <li key={index}>
                    <Link onClick={()=>changeContextValue(index)}
                     to="picture">{item}</Link>
                </li>)}
            </ul>
        </div>
        <Outlet/>
    </>
    )
}


export default Photos;