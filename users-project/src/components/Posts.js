import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from 'react-router-dom'
import { IdContext } from './../components/userContext';

function Posts() {
    const getId = useContext(IdContext)
    const [postList, setPostList] = useState([])
    const [commentsList, setCommentsList] = useState([])
    const [bool, setBool] = useState([])
    const posText = useRef()


    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${getId.myId}`)
            .then((response) => response.json())
            .then((data) => {
                let myList = []
                let boolArr = []
                for (let i = 0; i < data.length; i++) {
                    myList.push(data[i].body)
                    boolArr.push(false)
                }
                setPostList(myList)
                setBool(boolArr)
            })
    }, []);

    const showComments = (index) => {
        fetch(`https://jsonplaceholder.typicode.com/comments/?postId=${index}`)
            .then((response) => response.json())
            .then((data) => {
                let myList = [...commentsList]
                for (let i = 0; i < data.length; i++) {
                    myList.push(data[i].body)
                }
                setCommentsList(myList)
            })
            showMyPostsList(index)
    }
   
    const focusInput = () => {
        console.log("hi")
        posText.current.focus();
      };    

    const showMyPostsList = (index) => {
        let bollArr = [...bool]
        bollArr[index] ? bollArr[index] = false : bollArr[index] = true;
        setBool(bollArr);
    }
    return (<>
        
        <div className="todo">
            {<ul>{postList.map((item, index) =>
                <li key={index} ref={posText}
                 onClick={()=>focusInput()}>
                     {item}
                <button onClick={()=> (showComments(index))}
                 >Show comments</button>
                 
                 <div>{bool[index] ? <div>{commentsList.map((comment, index)=>
                 <p key={index}><br/>{comment}</p>
                 )}</div> : <p></p> }</div> 
                  </li>)
                  } 
            </ul> }
        </div>
    </>
    )
}


export default Posts;