import { useState } from "react";

const TaskForm = ({onAdd}) =>{
  const [taskName, setTaskName] = useState('');
  const handleSubmit= (ev) =>{
    ev.preventDefault();
    onAdd(taskName);
    setTaskName('')
  }

  return(
    <form onSubmit={handleSubmit}>
        <button>+</button>
        <input type="text" value={taskName} onChange={ev => setTaskName(ev.target.value)} placeholder="Your Next Task..." />
      </form>
  );
}

export default TaskForm;