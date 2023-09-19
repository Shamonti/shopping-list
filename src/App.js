import { useState } from 'react';

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems(items => [...items, item]);
  }

  function handleToggleItem(id) {
    setItems(
      items.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id));
  }

  return (
    <div className='app'>
      <Header />
      <FormAddItems
        onAddItems={handleAddItems}
        onToggleItem={handleToggleItem}
      />
      <ItemsList
        items={items}
        onToggleItem={handleToggleItem}
        onDeleteItem={handleDeleteItem}
      />
    </div>
  );
}

function Header() {
  return <h1>Shopping List</h1>;
}

function FormAddItems({ onAddItems }) {
  const [item, setAddItem] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!item) return;

    const id = crypto.randomUUID();

    const newItem = {
      id: id,
      name: item,
      checked: false,
    };

    onAddItems(newItem);
    setAddItem('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Enter the items'
        value={item}
        onChange={e => setAddItem(e.target.value)}
      />
      <button className='button'>Add Items</button>
    </form>
  );
}

function ItemsList({ items, onToggleItem, onEditItem, onDeleteItem }) {
  return (
    <ul>
      {items.map(item => (
        <Item
          item={item}
          onToggleItem={onToggleItem}
          onEditItem={onEditItem}
          onDeleteItem={onDeleteItem}
          key={item.id}
        />
      ))}
    </ul>
  );
}

function Item({ item, onToggleItem, onEditItem, onDeleteItem }) {
  return (
    <div>
      <li>
        <input type='checkbox' onChange={() => onToggleItem(item.id)} />
        <p style={item.checked ? { textDecoration: 'line-through' } : null}>
          {item.name}
        </p>
        <button className='button' onClick={onEditItem}>
          Edit
        </button>
        <span onClick={() => onDeleteItem(item.id)}>❌</span>
      </li>
    </div>
  );
}
