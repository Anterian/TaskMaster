import React, { useState } from 'react';
import './TodoForm.css'; // Стили для формы

const TodoForm = ({ addTodo }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) return; // Проверка на пустую задачу
    addTodo({ id: Date.now(), task, completed: false });
    setTask(''); // Очистка поля после добавления
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