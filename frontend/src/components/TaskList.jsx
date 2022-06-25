import { Container } from '@mui/system'
import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from '../UserContext';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const TaskList = () => {
    const userInfo = useContext(UserContext);
  const [inputVal, setInputVal] = useState('');
  const [datedue, setDateDue] = useState('');
  const [todos,setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/todos', {withCredentials:true})
      .then(response => {
        setTodos(response.data);
      })
  }, []);

  if (!userInfo.email) {
    return 'You need to be logged in to see this page';
  }

  function addTodo(e) {
    e.preventDefault();
    axios.put('http://localhost:4000/todos', {text:inputVal, date:datedue}, {withCredentials:true})
      .then(response => {
        setTodos([...todos, response.data]);
        setInputVal('');
        toast("Added new task to do!");
      })

  }

  function updateTodo(todo) {
    const data = {id:todo._id,done:!todo.done};
    axios.post('http://localhost:4000/todos', data, {withCredentials:true})
      .then(() => {
        const newTodos = todos.map(t => {
          if (t._id === todo._id) {
            t.done = !t.done;
          }
          return t;
        });
        setTodos([...newTodos]);
      });
  }

  return (
    <div>
    <Container maxWidth="sm"
        direction="column"
        className="Container">
            <form onSubmit={e => addTodo(e)}>
            <div className="TextInputDiv">
            <TextField
            value={inputVal}
            placeholder='Add new todo'
            onChange={e => setInputVal(e.target.value)}
            />
            </div>
            <div className="TextInputDiv">
            <label>Set date due</label>
            <br></br>
            <TextField
            type="date"
            value={datedue}
            onChange={e => setDateDue(e.target.value)}
            />
            </div>
            <Button variant="contained" onClick={e => addTodo(e)}><AddCircleIcon /></Button>
    </form>
    <h3>My tasks</h3>
    <ul>
      {todos.map(todo => (
        <List sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}>
          <input type={'checkbox'}
                 checked={todo.done}
                 onClick={() => updateTodo(todo)}
          />
          
          {todo.done ? <del>{todo.text}</del> : todo.text}
          <br></br>
          <p> <CalendarMonthIcon /> {todo.datedue}</p>
        </List>
      ))}

    </ul>
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

export default TaskList