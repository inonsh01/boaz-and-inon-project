import './App.css';
import Login from './components/login';
import ErrorPage from './components/errorPage'
import HomePage from './components/homePage'
import UserPage from './components/userPage'
import Todos from './components/Todos';
import Shared from './components/Shared';
import Posts from './components/Posts';
import Photos from './components/Photos';
import { UserProvider } from './components/userContext';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/users/:name' element={<Shared />}>
          <Route index element = {<UserPage />}/>
          <Route path='todos' element={<Todos />} />
          <Route path='posts' element={<Posts  />} />
          <Route path='albums' element={<Photos />} />
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </UserProvider>
  )
}

export default App;
