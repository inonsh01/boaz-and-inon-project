import React, { useState, useContext } from 'react';
import { useParams, useNavigate, Link, Outlet } from 'react-router-dom';
import { IdContext } from './../components/userContext';
import '../style/userPage.css';

export default function UserPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [infoText, setInfoText] = useState([]);
  const [isInfo, setIsInfo] = useState(false);
  const getId = useContext(IdContext);

  async function getUser() {
    const id = parseInt(getId.myId);
    let res = await fetch(`https://jsonplaceholder.typicode.com/users/?id=${id}`);
    res = await res.json();
    return res[0];
  }

  function info() {
    if (isInfo) {
      setInfoText([]);
      setIsInfo(false);
    } else {
      setIsInfo(true);
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
  }
  function logout() {
    localStorage.removeItem("currentUser");
    navigate("/login");
  }


  return (
    <div>
      <nav className='buttons'>
        <button className='btn' onClick={info}>Info</button>
        <button className='btn' onClick={logout}>Logout</button>
      </nav>
      <br />
      <ul className='info'>
        {infoText.map((element, index) => <li className={`li${index + 1}`} key={index}> {element} </li>)}
      </ul>
      <Outlet/>
    </div>
  )
}
