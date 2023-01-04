import './App.css';
import Login from './components/login';
import ErrorPage from './components/errorPage'
import HomePage from './components/homePage'
import UserPage from './components/userPage'
import { createContext } from "react";
import { Routes, Route } from 'react-router-dom';

const UserContext = createContext();

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/user page/:name' element={<UserPage />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  )
}

export default App;
