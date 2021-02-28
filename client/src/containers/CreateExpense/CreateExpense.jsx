import { useState, useContext, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import React from "react";
import UserContext from "../../contexts/UserContext";
import API from "../../utils/API";

const CreateExpense = () => {
  const history = useHistory();

  const [totalExpenseAmount, setTotalExpenseAmount] = useState("");
  const [description, setDescription] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");

  const { tripId } = useParams();
  const { userId } = useParams();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    API.createExpense({
      expenseCreator: userId,
      trip: tripId,
      totalExpenseAmount,
      category: expenseCategory,
      description,
    })
      .then((response) => {
        console.log(response.data);
        history.push(`/user/${userId}/trips/${tripId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mt-6">
      <h1 className="title has-text-centered">Create an Expense:</h1>
      <div className="columns is-centered">
        <div className="column is-4">
          <form onSubmit={handleFormSubmit}>
            <div className="field">
              <label className="label">Amount</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="number"
                  min="0"
                  step=".01"
                  // pattern="^\d*(\.\d{0,2})?$"
                  placeholder="100,000"
                  value={totalExpenseAmount}
                  name="totalExpenseAmount"
                  onChange={(e) => setTotalExpenseAmount(e.target.value)}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-dollar-sign"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <div className="select">
                  <select
                    name="category"
                    value={expenseCategory}
                    onChange={(e) => setExpenseCategory(e.target.value)}
                  >
                    <option disabled="disabled" defaultValue="Select One">
                      Select One
                    </option>
                    <option>Activities</option>
                    <option>Airfare</option>
                    <option>Car & Gas</option>
                    <option>Food & Dining</option>
                    <option>Entertainment</option>
                    <option>Lodging</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  className="textarea"
                  placeholder="Description of the expense"
                  type="text"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button className="button is-primary">Submit</button>
              </div>
              <Link
                to={`/user/${userId}/trips/${tripId}`}
                className="button is-light mr-4"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateExpense;
