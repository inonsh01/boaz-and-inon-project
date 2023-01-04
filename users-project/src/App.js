import './App.css';
import Login from './components/login';
import ErrorPage from './components/errorPage'
import HomePage from './components/homePage'
import UserPage from './components/userPage'
import Todos from './components/Todos';
import Posts from './components/Posts';
import Photos from './components/Photos';
import Picture from './components/Picture';
import { UserProvider } from './components/userContext';
import { AlbumProvider } from './components/AlbumsContext';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <UserProvider>
      <AlbumProvider>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/user page/:name' element={<UserPage />}>
            <Route path='todos' element={<Todos />} />
            <Route path='posts' element={<Posts />} />
            <Route path='albums' element={<Photos />} >
              <Route path='picture' element={<Picture />} />
            </Route>
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </AlbumProvider>
    </UserProvider>
  )
}

export default App;
