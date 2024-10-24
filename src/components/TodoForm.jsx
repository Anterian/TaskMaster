import React, { useState } from 'react';
import './TodoForm.css'; 

const TodoForm = ({ addTodo }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) return; 
    addTodo({ id: Date.now(), task, completed: false });
    setTask(''); 
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Введите задачу"
        className="todo-input"
      />
      <button type="submit" className="todo-button">Добавить</button>
    </form>
  );
};

export default TodoForm;