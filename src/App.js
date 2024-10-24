import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Header from './components/Header';
import './App.css'; 

const App = () => {
  const [lists, setLists] = useState([{ id: 1, name: 'Список задач', todos: [] }]);
  const [currentListId, setCurrentListId] = useState(1);
  const [newListName, setNewListName] = useState('');

  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem('lists'));
    if (storedLists) {
      setLists(storedLists);
      setCurrentListId(storedLists[0]?.id || null);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);

  const addTodo = (todo) => {
    if (!currentListId) return; 
    setLists(lists.map((list) =>
      list.id === currentListId ? { ...list, todos: [...list.todos, todo] } : list
    ));
  };

  const deleteTodo = (id) => {
    setLists(lists.map((list) =>
      list.id === currentListId ? { ...list, todos: list.todos.filter((todo) => todo.id !== id) } : list
    ));
  };

  const editTodo = (id, updatedTask) => {
    setLists(lists.map((list) =>
      list.id === currentListId ? {
        ...list,
        todos: list.todos.map((todo) => (todo.id === id ? { ...todo, task: updatedTask } : todo))
      } : list
    ));
  };

  const toggleComplete = (id) => {
    setLists(lists.map((list) =>
      list.id === currentListId ? {
        ...list,
        todos: list.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ),
      } : list
    ));
  };

  const createNewList = () => {
    if (!newListName) return;
    const newList = { id: Date.now(), name: newListName, todos: [] };
    setLists([...lists, newList]);
    setNewListName('');
    setCurrentListId(newList.id);
  };

  const deleteList = (id) => {
    const updatedLists = lists.filter((list) => list.id !== id);
    setLists(updatedLists);
    if (updatedLists.length > 0) {
      setCurrentListId(updatedLists[0].id);
    } else {
      setCurrentListId(null);
    }
  };

  const handleListChange = (id) => {
    setCurrentListId(id);
  };

  return (
    <div className="container">
      <Header 
        lists={lists} 
        currentListId={currentListId} 
        createNewList={createNewList} 
        newListName={newListName} 
        setNewListName={setNewListName} 
        handleListChange={handleListChange}
        deleteList={deleteList}
      />
      {currentListId ? (
        <>
          <h2 className="current-list-title">
            Текущий список: {lists.find((list) => list.id === currentListId)?.name}
          </h2>
          <TodoForm addTodo={addTodo} /> 
          <TodoList
            todos={lists.find((list) => list.id === currentListId)?.todos}
            deleteTodo={deleteTodo}
            toggleComplete={toggleComplete}
            editTodo={editTodo}
          />
        </>
      ) : (
        <p className="no-list-message">Создайте список задач, чтобы начать добавлять задачи</p>
      )}
    </div>
  );
};

export default App;

