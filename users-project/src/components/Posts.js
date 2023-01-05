import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from 'react-router-dom'
import { IdContext } from './../components/userContext';
import "../style/posts.css"


function Posts() {
    const getId = useContext(IdContext)
    const [postList, setPostList] = useState([])
    const [commentsList, setCommentsList] = useState([])
    const [bool, setBool] = useState([])
    const [idList, setIdList] = useState([])



    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${getId.myId}`)
            .then((response) => response.json())
            .then((data) => {
                let myList = []
                let boolArr = []
                let commentArr = [...commentsList]
                let postArr = []
                for (let i = 0; i < data.length; i++) {
                    myList.push(data[i].body)
                    postArr.push(data[i].id)
                    boolArr.push(false)
                    commentArr.push([])
                }
                setIdList(postArr)
                setPostList(myList)
                setBool(boolArr)
                setCommentsList(commentArr)
            })
    }, []);

    const showComments = (index) =>{
            fetch(`https://jsonplaceholder.typicode.com/comments/?postId=${idList[index]}`)
            .then((response) => response.json())
            .then((data) => {
                let myList = [...commentsList]
                for (let j = 0; j < data.length; j++) {
                    myList[index].push(data[j].body);  
                }
            setCommentsList(myList)
            })  
            showMyPostsList(index)
    }

    const showMyPostsList = (index) => {
        let bollArr = [...bool]
        bollArr[index] ? bollArr[index] = false : bollArr[index] = true;
        setBool(bollArr);
    }
    return (<div className="todo">
        <div >
            {<ul>{postList.map((item, index) =>
                <li className="post" key={index}>
                    {item}
                    <button onClick={() => (showComments(index))}
                    >Show comments</button>

                    <div>{bool[index] ? <div>{commentsList[index].map((comment, i) =>
                        <p key={i}><br />{comment}</p>
                    )}</div> : <p></p>}</div>
                </li>)
            }
            </ul>}
        </div>
    </div>
    )
}


export default Posts;