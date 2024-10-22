import React, { useState } from 'react';
import './TodoItem.css'; // Импортируйте стили для TodoItem

const TodoItem = ({ todo, deleteTodo, editTodo, toggleTodoCompletion }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(todo.task);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editTodo(todo.id, updatedTask);
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
      <input 
        type="checkbox" 
        checked={todo.completed} 
        onChange={() => toggleTodoCompletion(todo.id)} 
        className="todo-checkbox"
      />
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input 
            type="text" 
            value={updatedTask} 
            onChange={(e) => setUpdatedTask(e.target.value)} 
            className="todo-edit-input" 
          />
          <button type="submit" className="save-button">Сохранить</button>
        </form>
      ) : (
        <span className={todo.completed ? 'completed' : ''}>
          {todo.task}
        </span>
      )}
      <button onClick={() => setIsEditing(!isEditing)} className="edit-button">Редактировать</button>
      <button onClick={() => deleteTodo(todo.id)} className="delete-button">Удалить</button>
    </div>
  );
};

export default TodoItem;