import React, { useState, useContext } from 'react';
import { useParams, useNavigate, Link, Outlet } from 'react-router-dom';
import { IdContext } from './../components/userContext';

export default function UserPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [infoText, setInfoText] = useState([]);
  const getId = useContext(IdContext);

  async function getUser() {
    const id = parseInt(getId.myId);
    let res = await fetch(`https://jsonplaceholder.typicode.com/users/?id=${id}`);
    res = await res.json();
    return res[0];
  }

  function info() {
    let text = "";
    getUser()
      .then(user => {
        for (let detail in user) {
          text += `${detail}:`
          if (typeof user[detail] === "object") {
            for (let minDetail in user[detail]) {
              text += ` ${minDetail}`
              if (typeof user[detail][minDetail] === "object") {
                text += `: ${Object.keys(user[detail][minDetail])[0]}: `
                text += `${Object.values(user[detail][minDetail])[0]}, `
                text += `${Object.keys(user[detail][minDetail])[1]}: `
                text += `${Object.values(user[detail][minDetail])[1]}/ `
              }
              else {
                text += `: ${user[detail][minDetail]}, `
              }
            }
          }
          else {
            text += ` ${user[detail]}/ `
          }
        }
        text = text.split("/");
        setInfoText(text);
      })
  }
  function logout() {
    localStorage.removeItem("currentUser");
    navigate("/login");
  }


  return (
    <div>
      <h1>Hello {name} you are logged in</h1>
      <div className='buttons'>
        <button onClick={info}>Info</button>
        <button onClick={logout}>Logout</button>
        <Link to={`/user page/${name}/Todos`}>Todos</Link>
        <Link to={`/user page/${name}/Posts`}>Posts</Link>
        <Link to={`/user page/${name}/Albums`}>Albums</Link>
      </div>
      <ul>
        {infoText.map((element, index) => <li key={index}> {element} </li>)}
        
      </ul>
      <Outlet/>
    </div>
  )
}
