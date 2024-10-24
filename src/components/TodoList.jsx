import React, { useState } from 'react';
import './TodoList.css';

const TodoList = ({ todos, deleteTodo, toggleComplete, editTodo }) => {
  const [editTaskId, setEditTaskId] = useState(null); 
  const [newTaskText, setNewTaskText] = useState(''); 

  const handleEditClick = (todo) => {
    setEditTaskId(todo.id); 
    setNewTaskText(todo.task); 
  };

  const handleSaveEdit = (id) => {
    editTodo(id, newTaskText); 
    setEditTaskId(null); 
  };

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <div key={todo.id} className="todo-item">
          <input 
            type="checkbox" 
            checked={todo.completed} 
            onChange={() => toggleComplete(todo.id)} 
          />
          {editTaskId === todo.id ? (
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              className="edit-input"
            />
          ) : (
            <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
              {todo.task}
            </span>
          )}

          <div className="todo-actions">
            {editTaskId === todo.id ? (
              <button className="save-button" onClick={() => handleSaveEdit(todo.id)}>
                Сохранить
              </button>
            ) : (
              <button className="edit-button" onClick={() => handleEditClick(todo)}>
                Редактировать
              </button>
            )}
            <button className="delete-button" onClick={() => deleteTodo(todo.id)}>
              Удалить
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;