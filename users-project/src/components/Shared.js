import { useParams, useNavigate, Link, Outlet } from 'react-router-dom';
import '../style/userPage.css';

export default function UserPage() {
  const { name } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1 className='welcome-user'>Hello {name} you are logged in</h1>
      <h3>there is below things you can do:</h3>
      <br />
      <nav className='buttons'>
        <Link className='btn' to={`Todos`}>Todos</Link>
        <Link className='btn' to={`Posts`}>Posts</Link>
        <Link className='btn' to={`Albums`}>Albums</Link>
        <Link className='btn' to={``}>Back to home</Link>
      </nav>
      <br />
      <Outlet />
    </div>
  )
}
