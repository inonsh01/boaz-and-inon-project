import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function UserPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [infoText, setInfoText] = useState([]);

  async function getUser() {
    let userDetails;
    const id = parseInt(localStorage.getItem('currentUser').split(',')[1]);
    let res = await fetch("https://jsonplaceholder.typicode.com/users");
    res = await res.json();
    for (let user of res) {
      if (user.id === id) {
        userDetails = user;
      }
    }
    return userDetails;
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
    </div>
  )
}
