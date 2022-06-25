import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import TaskList from './components/TaskList.jsx';
import axios from 'axios';
import UserContext from "./UserContext";

function App() {

  const [email,setEmail] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/user', {withCredentials:true})
      .then(response => {
        setEmail(response.data.email);
      });
  }, []);

  function logout() {
    axios.post('http://localhost:4000/logout', {}, {withCredentials:true})
      .then(() => setEmail(''));
  }

  return (
    <UserContext.Provider value={{email,setEmail}}>
    <Router>
    <nav>
          <Link to={'/'}>Home   </Link>
          {!email && (
            <>
              <Link to={'/'}>Login  </Link>
              <Link to={'/signup'}>Sing Up  </Link>
            </>
          )}
          {!!email && (
            <a onClick={e => {e.preventDefault();logout();}}>Logout</a>
          )}
        </nav>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/tasklist' element={<TaskList />} />
      </Routes>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
