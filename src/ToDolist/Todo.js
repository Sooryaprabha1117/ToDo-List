import React, { useState, useEffect } from 'react';
import './ToDo.css';

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [allCompleted, setAllCompleted] = useState(false);

  // Add new task
  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input, completed: false }]);
      setInput('');
    }
  };

  // Complete a task
  const completeTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Delete a task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Check if all tasks are completed
  useEffect(() => {
    if (tasks.length > 0 && tasks.every((task) => task.completed)) {
      setAllCompleted(true);
    } else {
      setAllCompleted(false);
    }
  }, [tasks]);

  return (
    <div className={`app ${allCompleted ? 'celebrate' : ''}`}>
      {/* Centered Heading outside the main container */}
      <h1 className="heading">
        <span className="todo">ToDo</span> <span className="list">List</span>
      </h1>

      {/* Main To-Do List Container */}
      <div className="todo-container">
        <div className="input-container">
          <input
            type="text"
            placeholder="Add a task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={addTask}>Add Task</button>
        </div>
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <span className="task-text">{task.text}</span>
              <div className="task-buttons">
                <button onClick={() => completeTask(index)}>Complete</button>
                <button onClick={() => deleteTask(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
