import React, { useState, useEffect, useContext } from "react";
import { Link, Outlet } from 'react-router-dom'
import { AlbumContext } from './../components/AlbumsContext';
import { IdContext } from './../components/userContext';


function Photos() {
    const getId = useContext(IdContext)
    const [albumsList, setAlbumsList] = useState([])
    const [bool, setBool] = useState(false)
    const dataToPicture = 0;
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
        getAlbum.changeAlbum(index)
    }

    // const showMyPostsList = () => {
    //     bool ? setBool(false) : setBool(true)
    // }
    return (<>
        {/* <div>
            <button onClick={() => showMyPostsList()}>Show my alboms</button>
        </div> */}

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