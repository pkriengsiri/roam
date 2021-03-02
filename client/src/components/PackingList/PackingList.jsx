import React, { useState, useEffect } from "react";
import API from "../../utils/API";

const PackingList = () => {
  const [item, setItem] = useState("");
  const [itemEditing, setItemEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [list, setList] = useState([{}]);

  // useEffect(()=> {
  // setList([...list].concat({item: item, packed: false}));
  // }, [item])

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      text: item,
      packed: false,
    };

    console.log(newItem);

    setList([...list].concat(newItem));
    setItem("");
    // console.log(item);
    
    // console.log(list);

    // API.createItem({list }).then((response) => {
      
    //   console.log(response.data);
    // })
    
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
            className="input"
              type="text"
              placeholder="Add an item"
              value={item}
              name="text"
              onChange={(e) => setItem(e.target.value)}
            />
            <div className="control">
            <button className="button" type="submit"><i className="fas fa-plus fa-lg"></i></button></div>
          </form>
          {list.map((item) => (
            <div key={item.id}>

                <div className="columns">
                    <div className="column is-10">
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
                </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackingList;
