import React, { useState, useEffect, useContext } from "react";
import { IdContext } from './../components/userContext';

function Photos() {
    const getId = useContext(IdContext)
    const [albumsList, setAlbumsList] = useState([])

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

    return (<>
        <div className="talboms">
            <ul>{albumsList.map((item, index) =>
                <li key={index}> {item} </li>)}
            </ul>
        </div>
    </>
    )
}


export default Photos;