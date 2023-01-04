import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom'
import { IdContext } from './../components/userContext';


function Todos(params) {
    const getId = useContext(IdContext)
    const [toDoList, setTodoList] = useState([])
    const [ifComlited, setIfComlited] = useState([])
    const [bool, setBool] = useState(false)

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/todos?userId=${getId.myId}`)
            .then((response) => response.json())
            .then((data) => {
                let myList = []
                let ifComlitedArr = []
                for (let i = 0; i < 20; i++) {
                    myList.push(data[i].title)
                    ifComlitedArr.push(data[i].completed)
                }
                setTodoList(myList)
                setIfComlited(ifComlitedArr)
            })
    }, []);

    const showMyTodosList = () => {
        bool ? setBool(false) : setBool(true)
    }

    const changeIfComlitedStatus = (index) => {
        let arr = [...ifComlited];
        arr[index] ? (arr[index] = false) : (arr[index] = true)
        setIfComlited(arr);
    }
    return (<>
        <div className="todo">
            <ul>{toDoList.map((item, index) =>
                <li key={index}> {item}
                    <input
                        type="checkbox" id="myCheck" checked={ifComlited[index]}
                        onClick={() => changeIfComlitedStatus(index)}>
                    </input></li>)}
            </ul>
        </div>
    </>
    )
}

export default Todos;