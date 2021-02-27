import { useState } from "react";
import React from "react";

const CreateExpense = () => {
  const [totalExpenseAmount, setTotalExpenseAmount] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div className="container">
      <h1 className="title has-text-centered">Create an Expense:</h1>
      <div className="columns is-centered">
        <div className="column is-4">
          <div className="field">
            <label className="label">Amount</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="text"
                placeholder="Text input"
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
                <select>
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

          {/* <div className="field">
            <div className="control">
              <label className="checkbox">
                <input type="checkbox" />I agree to the{" "}
                <a href="#">terms and conditions</a>
              </label>
            </div>
          </div> */}

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link">Submit</button>
            </div>
            <div className="control">
              <button className="button is-link is-light">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateExpense;
