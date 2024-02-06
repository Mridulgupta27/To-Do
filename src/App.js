import "./App.css";
import TaskForm from "./components/TaskForm";
import Task from "./components/Task";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    // if (Array.isArray(tasks)) {
    //   setTasks(tasks);
    // }
    setTasks(tasks || []);
  }, []);

  const addTask = (name) => {
    setTasks((prev) => {
      return [...prev, { name:name, done:false }];
    });
  };

  const removeTask = (indexToRemove) => {
    setTasks(prev => {
      return prev.filter((taskObject, index) => index !== indexToRemove);
      });
    }
  

  const updateTaskDone = (taskIndex, newDone) => {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  };

  const numberComplete = tasks.filter(t => t.done).length;
  const numberTotal = tasks.length;

  const getMessage = () => {
    let percentage = (numberComplete / numberTotal) * 100;
    if (percentage === 0) {
      return "Try to do atleast one 🚀";
    }
    if (percentage === 100) {
      return "Congratulation! Nice Job 💐💐";
    }
    if (numberTotal === 0){
      return 'Assign Some Task 🏅';
    }
    return "Keep it Up 💪💪";
  };

  function renameTask(index, newName) {
    setTasks(prev =>{
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    })
  }

  return (
      <main>
      <h1>
        {numberComplete}/{numberTotal} Complete
      </h1>
      <h2>{getMessage()}</h2>
      <TaskForm onAdd={addTask} />
      {tasks.map((task, index) => (
        <Task {...task} 
        onRename={(newName) => renameTask(index, newName)}
        onTrash={() => removeTask(index)}
        onToggle={(done) => updateTaskDone(index, done)} />
      ))}
    </main>
    
  );
}

export default App;
