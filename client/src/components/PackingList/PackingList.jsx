import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import "./PackingList.css";

const PackingList = ({ userId, tripId }) => {
  const [item, setItem] = useState("");
  const [itemEditing, setItemEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [list, setList] = useState([{}]);

  useEffect(() => {
    getPackingListItems();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      packingListCreator: userId,
      trip: tripId,
      item: item,
      packed: false,
    };

    API.createItem(newItem)
      .then((response) => {
        console.log(response.data);
        getPackingListItems();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPackingListItems = () => {
    API.getPackingListItems(tripId)
      .then((response) => {
        // console.log(response.data);
        const listArray = [];

        response.data.forEach((item) => {
          listArray.push({
            id: item._id,
            item: item.item,
            packed: item.packed,
          });
        });

        setList(listArray);
        setItem("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteItem = (e) => {
    const itemId = e.target.dataset.id;
    API.deleteItem(itemId).then((response) => {
      console.log(response);
      console.log("deleted");
      getPackingListItems();
    });
  };

  const togglePacked = (e) => {
    const itemId = e.target.dataset.checked;

    const packed = e.target.checked;

    console.log(packed);
    const newState = {
      packed: packed,
    };
    console.log(newState);

    API.editItem(itemId, newState)
      .then((response) => {
        console.log(response.data);
        getPackingListItems();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editItem = (e) => {
    const itemId = e.target.dataset.edit;
    console.log(e.target.dataset);
    const newEdit = {
      item: editingText,
    };
    API.editItem(itemId, newEdit)
      .then((response) => {
        console.log(response.data);
        getPackingListItems();
      })
      .catch((err) => {
        console.log(err);
      });

    setEditingText("");
    setItemEditing(null);
  };

  return (
    <div>
      <div className="columns is-centered">
        <div className="column is-10">
          <form onSubmit={handleSubmit}>
            <div className="field has-addons">
              <input
                className="input"
                type="text"
                placeholder="Add an item"
                value={item}
                name="text"
                onChange={(e) => setItem(e.target.value)}
              />
              {item !== "" && (
              <div className="control">
                <button className="button" type="submit">
                  <i className="fas fa-plus fa-lg"></i>
                </button>
              </div>
              )}
            </div>
          </form>
          {list.map((item) => (
            <div key={item.id}>
              {/* <div className="columns">
                <div className="column is-8"> */}
              <table className="table">
                <tbody>
                  <tr>
                    <td className="is-vcentered">
                      <span>
                        <input
                          type="checkbox"
                          data-checked={item.id}
                          data-packed={item.packed}
                          onChange={togglePacked}
                          checked={item.packed}
                        />
                      </span>
                    </td>
                    <td className="checklist-description is-vcentered">
                      {itemEditing === item.id ? (
                        <input
                          className="input"
                          type="text"
                          placeholder={item.item}
                          onChange={(e) => setEditingText(e.target.value)}
                          value={editingText}
                        />
                      ) : (
                        <>
                          <span>{item.item}</span>
                         
                        </>
                      )}
                    </td>
                    <td className="checklist-buttons is-vcentered">
                      <span>
                        <i
                          className="packing-icon far fa-trash-alt p-1"
                          data-id={item.id}
                          onClick={deleteItem}
                        ></i>

                        {itemEditing === item.id ? (
                          <i
                            className="packing-icon far fa-save p-1"
                            data-edit={item.id}
                            onClick={editItem}
                          ></i>
                        ) : (
                          <i
                            className="packing-icon far fa-edit p-1"
                            onClick={() => setItemEditing(item.id)}
                          ></i>
                        )}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* <div className="column is-4"> */}

              {/* </div> */}
              {/* </div>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackingList;
