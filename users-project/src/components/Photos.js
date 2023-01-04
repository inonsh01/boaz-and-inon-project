import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom'
import { IdContext } from './../components/userContext';

function Photos() {
    const getId = useContext(IdContext)
    const [albumsList, setAlbumsList] = useState([])
    const [bool, setBool] = useState(false)



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




    const showMyPostsList = () => {
        bool ? setBool(false) : setBool(true)
    }
    return (<>
        <div>
            <button onClick={() => showMyPostsList()}>Show my alboms</button>
        </div>
        <div className="talboms">
            {bool ? <ul>{albumsList.map((item, index) =>
                <li key={index}> {item} </li>)}
            </ul> :
                <p>press on the button to see your alboms</p>}
        </div>
    </>
    )
}


export default Photos;