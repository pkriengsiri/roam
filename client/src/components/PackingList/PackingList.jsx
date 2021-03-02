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
    console.log("clicked to edit")
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

          <table className="table list-container is-fullwidth">
            <tbody>
              {list.map((item) => (
                // <div key={item.id}>
                <tr key={item.id}>
                  {/* radio button  */}
                  <td className="checklist-checkbox is-vcentered has-text-center ">
                    <span className="pr-2">
                      <input
                        type="checkbox"
                        data-checked={item.id}
                        data-packed={item.packed}
                        onChange={togglePacked}
                        checked={item.packed}
                      />
                    </span>
                  </td>
                  {/* text field */}
                  <td className="checklist-description is-vcentered has-text-left ">
                    {itemEditing === item.id ? (
                      <input
                        className="input"
                        type="text"
                        onChange={(e) => setEditingText(e.target.value)}
                        value={editingText}
                      />
                    ) : (
                      <>
                        <span
                          className={
                            item.packed ? "packed-item" : "unpacked-item"
                          }
                          onClick={() => {
                            setItemEditing(item.id);
                            setEditingText(item.item);
                          }}
                        >
                          {item.item}
                        </span>
                      </>
                    )}
                  </td>

                  {/* edit/ delete icons */}
                  <td className="checklist-buttons is-vcentered has-text-right ">
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
                          onClick={() => {
                            setItemEditing(item.id);
                            setEditingText(item.item);
                          }}
                        ></i>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PackingList;
