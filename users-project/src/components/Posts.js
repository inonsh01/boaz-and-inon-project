import React, { useState, useEffect, useContext } from "react";
import { IdContext } from './../components/userContext';

function Posts() {
    const getId = useContext(IdContext)
    const [postList, setPostList] = useState([])


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

    return (<>
        <div className="todo">
            <ul>{postList.map((item, index) =>
                <li key={index}> {item} </li>)}
            </ul>
        </div>
    </>
    )
}


export default Posts;