import React from 'react';
import './Header.css';

const Header = ({ lists, currentListId, createNewList, newListName, setNewListName, handleListChange, deleteList }) => {
  return (
    <header className="header">
      <h1 className="header-title">Ваши списки</h1>
      <div className="list-controls">
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="Название нового списка"
          className="new-list-input"
        />
        <button onClick={createNewList} className="create-list-button">Создать список</button>
      </div>
      <div className="list-selector">
        {lists.map((list) => (
          <div key={list.id} className="list-item">
            <button 
              onClick={() => handleListChange(list.id)} 
              className={`list-button ${currentListId === list.id ? 'active' : ''}`}
            >
              {list.name}
            </button>
            <button onClick={() => deleteList(list.id)} className="delete-list-button">Удалить</button>
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;