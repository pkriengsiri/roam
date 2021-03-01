import React, { useState } from "react";

const PackingList = () => {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [itemEditing, setItemEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: new Date().getTime(),
      text: input,
      packed: false,
    };
    setList([...list].concat(newItem));
    setInput("");
  };

  const deleteItem = (id) => {
    const updatedList = [...list].filter((item) => item.id !== id);
    setList(updatedList);
  };

  const togglePacked = (id) => {
    const updatedList = [...list].map((item) => {
      if (item.id === id) {
        item.packed = !item.packed;
      }
      return item;
    });

    setList(updatedList);
  };

  const editItem = (id) => {
    const updatedList = [...list].map((item) => {
      if (item.id === id) {
        item.text = editingText;
      }
      return item;
    });
    setList(updatedList);
    setEditingText("");
    setItemEditing(null);
  };

  return (
    <div>
      <div className="columns is-centered">
        <div className="column is-5">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Add an item"
              value={input}
              name="text"
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Add</button>
          </form>
          {list.map((item) => (
            <div key={item.id}>
              <input
                type="checkbox"
                onChange={() => togglePacked(item.id)}
                checked={item.packed}
              />
              {itemEditing === item.id ? (
                <input
                  type="text"
                  onChange={(e) => setEditingText(e.target.value)}
                  value={editingText}
                />
              ) : (
                <div>{item.text}</div>
              )}

              <button onClick={() => deleteItem(item.id)}>Delete</button>
              {itemEditing === item.id ? (
                <button onClick={() => editItem(item.id)}>Save</button>
              ) : (
                <button onClick={() => setItemEditing(item.id)}>Edit</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackingList;
