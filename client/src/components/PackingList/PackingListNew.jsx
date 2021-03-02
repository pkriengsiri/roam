import React, { useState } from "react";
import API from "../../utils/API";

const PackingListNew = () => {
  const [input, setInput] = useState("");
  const [list, setList] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    setList([...list].concat({item: input, packed: false}));
    console.log(list);

     API.createItem(list).then((response) => {
      
      console.log(response.data);
    })
    
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
              value={input}
              name="text"
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="control">
              <button className="button" type="submit">
                <i className="fas fa-plus fa-lg"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PackingListNew;
