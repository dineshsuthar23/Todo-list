import React, { useState } from 'react'
import axios from 'axios'

function Create() {
    const [task, setTask] = useState('')
    const handleAdd = () => {
        axios.post('http://localhost:3001/add', { task: task })
            .then(result => location.reload())
            .catch(err => console.log(err))
        setTask('')
    }
    return (
        <div className='createForm'>
            <input type="text" placeholder='Your Work' onChange={(e) => setTask(e.target.value)} value={task} />
            <button onClick={handleAdd}>Add</button>
        </div>
    )
}

export default Create;