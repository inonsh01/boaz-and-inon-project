import React, { useState, useEffect, useContext } from "react";
import { IdContext } from './../components/userContext';


function Todos(params) {
    const getId = useContext(IdContext)
    const [toDoList, setTodoList] = useState([])
    const [ifCompleted, setIfCompleted] = useState([])
    const [firstToDoList, setFirstToDoList] = useState(false)
    const [idsAndCompleteArr, setIdsAndCompleteArr] = useState([])
    useEffect(() => {
        try {
            fetch(`https://jsonplaceholder.typicode.com/todos?userId=${getId.myId}`)
                .then((response) => response.json())
                .then((data) => {
                    let myList = []
                    let newIdsAndCompleteArr = [];
                    let ifCompletedArr = []
                    for (let i = 0; i < 20; i++) {
                        myList.push(data[i].title)
                        ifCompletedArr.push(data[i].completed)
                        newIdsAndCompleteArr.push({ title: data[i].title, comp: data[i].completed })
                    }
                    setIdsAndCompleteArr(newIdsAndCompleteArr);
                    setTodoList(myList)
                    setFirstToDoList(myList)
                    setIfCompleted(ifCompletedArr)
                })
        }
        catch (error) {
            console.log(error);
        }
    }, []);

    const changeIfCompletedStatus = (index) => {
        let arr = [...ifCompleted];
        arr[index] ? (arr[index] = false) : (arr[index] = true)
        setIfCompleted(arr);
    }

    function handleChange(event) {
        let arr = [...toDoList];
        switch (event.target.value) {
            case "Alphabet":
                arr = arr.sort((a, b) =>
                    a[0] < b[0] ? -1 : 1
                );
                changeIsComplete(arr);
                setTodoList(arr);
                break;

            case "Checked":
                let arrChecked = [];
                let arrNotChecked = [];
                for (let index in arr) {
                    if (ifCompleted[index]) {
                        arrChecked.push(arr[index]);
                    }
                    else {
                        arrNotChecked.push(arr[index]);
                    }
                }
                arrChecked.push(...arrNotChecked);
                changeIsComplete(arrChecked);
                setTodoList(arrChecked);
                break;

            case "Random":
                let currentIndex = arr.length, randomIndex;
                while (currentIndex !== 0) {
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex--;
                    [arr[currentIndex], arr[randomIndex]] = [
                        arr[randomIndex], arr[currentIndex]];
                }
                changeIsComplete(arr);
                setTodoList(arr);
                break;
            case "Id":
                changeIsComplete(firstToDoList)
                setTodoList(firstToDoList);
                break;
            default:
                break;
        }
    }

    //on every change change also the completed list
    function changeIsComplete(arr) {
        let newCompletedArr = [];
        for (let index in arr) {
            for (let todo of idsAndCompleteArr) {
                if (todo.title === arr[index]) {
                    newCompletedArr.push(todo.comp);
                }
            }
        }
        setIfCompleted(newCompletedArr);
    }

    return (<>
        <div className="todo">
            <ul>{toDoList.map((item, index) =>
                <li key={index}> {item}
                    <input
                        type="checkbox" id="myCheck" checked={ifCompleted[index]}
                        onChange={() => changeIfCompletedStatus(index)}>
                    </input></li>)}
                <select onChange={(ev) => handleChange(ev)} name="sort" id="select">
                    <option>Sort By</option>
                    <option> Alphabet</option>
                    <option> Checked</option>
                    <option> Random</option>
                    <option> Id</option>
                </select>
            </ul>
        </div>
    </>
    )
}

export default Todos;