import React, {useState, useContext} from 'react';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import 'react-toastify/dist/ReactToastify.css';
//import Link from '@mui/material/Link';
import UserContext from "../UserContext";
import {Navigate} from "react-router-dom";
import {ToastContainer,toast} from 'react-toastify';
import axios from 'axios';
import '../index.css';


const SignUp = () => {
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  const hello = () => toast("Hello, hello, hello");

  const user = useContext(UserContext);

  function validateParameters(e){

    const data = {username,email,password};

    if(username === ''){
      toast.error("Enter a valid username");
    }
    if(email === ''){
      toast.error("Enter a valid email");
    }
    if(password === ''){
      toast.error("Don't leave a blank password");
    }
    else{
        registerUser(e);
    }

  }

  function registerUser(e) {
    e.preventDefault();
    const data = {username,email,password};
    axios.post('http://localhost:4000/signup', data, {withCredentials:true})
      .then(response => {
        console.log(response.status);
          //user.setEmail(response.data.email);
          //setUsername('');
          //setPassword('');
          setRedirect(true);
      })
      .catch((error) => {
        console.log(error);
        toast.error("This email is already registred.")
      });
  }

  if (redirect) {
    toast.success("Registration succesful!");
    return <Navigate to={'/'} />
  }

  return (
    <div>
        <Container maxWidth="sm"
        direction="column"
        className="Container">
        <h1 className="ColorText"> To Do App <AssignmentTurnedInIcon /> </h1>
        <h3>Create new account</h3>
            
            <form>
            <div className="TextInputDiv">
            <TextField
            required ={true}
            id="username"
            label="Username"
            onChange={ e => setUsername(e.target.value)}
            />
            </div>
            <div className="TextInputDiv">
            <TextField
            required ={true}
            id="email"
            label="Email"
            onChange={ e => setEmail(e.target.value)}
            />
            </div>
            <div className="TextInputDiv">
            <TextField
            required ={true}
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
            />
            </div>
            </form> 
            <Button variant="contained" onClick={e => validateParameters(e)}>
            Sign Up
            </Button>
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
        </Container>  
    </div>
  )
}

export default SignUp