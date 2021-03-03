import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import "./PackingList.scss";

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

    let packed = e.target.dataset.packed;
    // console.log(e.target.dataset.packed);
    // console.log(packed);
    if (packed === "true") {
      packed = true;
    } else if ((packed = "false")) {
      packed = false;
    }

    const newState = {
      packed: !packed,
    };
    // console.log(newState);

    API.editItem(itemId, newState)
      .then((response) => {
        // console.log(response.data);
        getPackingListItems();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editItem = (e) => {
    // console.log("clicked to edit");
    const itemId = e.target.dataset.edit;
    // console.log(e.target.dataset);
    const newEdit = {
      item: editingText,
    };
    API.editItem(itemId, newEdit)
      .then((response) => {
        // console.log(response.data);
        getPackingListItems();
      })
      .catch((err) => {
        console.log(err);
      });

    setEditingText("");
    setItemEditing(null);
  };

  return (
    // <div className="columns is-centered">
    //   <div className="column is-10">

    <div className="">
      <div className="">
        <form onSubmit={handleSubmit} className="checklist-line">
          <div className="field has-addons ">
            <input
              className="input checklist-input"
              type="text"
              maxLength="75"
              placeholder="Type here to add an item"
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

        <table className=" is-fullwidth mb-4 checklist-table">
          <tbody>
            {list.map((item,index) => (
                // use index as key since id is throwing an error in the console
              <tr key={index} className="checklist-line">
                {/* radio button  */}
                <td className="checklist-checkbox is-vcentered has-text-center p-2">
                  <span className="pr-2 pl-2">
                    {/* <input
                      type="checkbox"
                      data-checked={item.id}
                      data-packed={item.packed}
                      onChange={togglePacked}
                      checked={item.packed}
                    /> */}
                    <i
                      className={
                        item.packed
                          ? "fas fa-check-square checklist-icon"
                          : "far fa-square checklist-icon"
                      }
                      data-checked={item.id}
                      data-packed={item.packed}
                      onClick={togglePacked}
                      checked={item.packed}
                    ></i>
                  </span>
                </td>
                {/* text field */}
                <td className="checklist-description is-vcentered has-text-left p-2">
                  {itemEditing === item.id ? (
                    <input
                      className="input checklist-input"
                      type="text"
                      maxLength="75"
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
                <td className=" is-vcentered has-text-right p-2 checklist-buttons">
                  <span className="">
                    <i
                      className="checklist-icon far fa-trash-alt p-1"
                      data-id={item.id}
                      onClick={deleteItem}
                    ></i>

                    {itemEditing === item.id ? (
                      <i
                        className="checklist-icon far fa-save p-1"
                        data-edit={item.id}
                        onClick={editItem}
                      ></i>
                    ) : (
                      <i
                        className="checklist-icon far fa-edit p-1"
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
  );
};

export default PackingList;
