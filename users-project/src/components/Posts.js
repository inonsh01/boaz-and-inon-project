import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom'
import { IdContext } from './../components/userContext';

function Posts() {
    const getId = useContext(IdContext)
    const [postList, setPostList] = useState([])
    const [bool, setBool] = useState(false)



    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${getId.myId}`)
            .then((response) => response.json())
            .then((data) => {
                let myList = []
                for (let i = 0; i < 10; i++) {
                    myList.push(data[i].body)
                }
                setPostList(myList)
            })
    }, []);




    const showMyPostsList = () => {
        bool ? setBool(false) : setBool(true)
    }
    return (<>
        <div>
            <button onClick={() => showMyPostsList()}>Show my posts</button>
        </div>
        <div className="todo">
            {bool ? <ul>{postList.map((item, index) =>
                <li key={index}> {item} </li>)}
            </ul> :
                <p>press on the button to see your posts</p>}
        </div>
    </>
    )
}


export default Posts;