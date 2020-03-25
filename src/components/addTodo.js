import React, { useState } from 'react';
import axios from 'axios';

function AddTodo(props) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        const task = {
            title: title,
            description: description
        }
        axios.post('http://localhost:5000/todo/api/v1.0/tasks', 
            task)
            .then((response) => {
                // console.log(response);
                // console.log(response.data.task);
                response.request.status === 201? setStatus('Saved'): setStatus('Error Saving!')
                if (response.request.status === 201) {
                    setStatus('Saved');
                    props.onAdd(response.data.task, status);                    
                }
            })
            .catch((error) =>{
                console.log(error);
                setStatus('Attempted to save your data but got an error');
                props.onAdd(null, status);
            });
    }

    const handleChange = (event) => {
        if (event.target.placeholder === 'Title') {
            setTitle(event.target.value);
        } else {
            setDescription(event.target.value);
        }
    }

    return (
        <div className='todoForm'>
            <h2>New task</h2>
            {/* <h4>{status}</h4> */}
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Title' required onChange={handleChange} />
                <input type='text' placeholder='Description' onChange={handleChange} />
                <button type='submit'>Save</button>
            </form>    
        </div>    
    )
  
}  

export default AddTodo;
