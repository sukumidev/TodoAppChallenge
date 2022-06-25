import React, {useContext, useState} from 'react';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import '../index.css';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import {Link, Navigate} from 'react-router-dom';
import UserContext from '../UserContext';
import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  const [loginError, setLoginError]= useState(false);

  const user = useContext(UserContext);

  function loginUser(e){
    e.preventDefault();
    
    const data = {email, password, username};

    try {
      const response = axios.post('http://localhost:4000/login', data, {withCredentials:true});
      console.log(response.status);
          //user.setEmail(response.data.email);
          setRedirect(true);
    } catch (error) {
      toast.error("Hay un error");
      console.log(error.response);
      setLoginError(true);
    }
  }
  
  if(redirect){
    return <Navigate to={'/TaskList'} />
  }

  return (    

    <div>
        <Container maxWidth="sm"
        direction="column"
        className="Container">
        <h1 className="ColorText"> To Do App <AssignmentTurnedInIcon /> </h1>
            <form>
            <div className="TextInputDiv">
            <TextField
            required
            id="email"
            label="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
            </div>
            <div className="TextInputDiv">
            <TextField
            required
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={ e => setPassword(e.target.value)}
            />
            </div>
            <Button variant="contained" onClick={e => loginUser(e)}>Login</Button>
            </form>
            
            <h6> Not have an account? <Link to="/signup"> Sign Up </Link> </h6> 
        </Container>
        <ToastContainer 
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            /> 
    </div>  
  )
}

export default Login
