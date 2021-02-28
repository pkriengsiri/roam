import React, { useState, useContext } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import "./ExpenseForm.css";
import Alert from "../Alert/Alert";
import AlertContext from "../../contexts/AlertContext";

const ExpenseForm = (props) => {
  const { onDisplay, display, theme } = useContext(AlertContext);

  const [totalExpenseAmount, setTotalExpenseAmount] = useState("");
  const [description, setDescription] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");

  const { tripId } = useParams();
  const { userId } = useParams();

  const handleAmountChange = (e) => {
    console.log(e.target.value);
    const re = /[+-]?[0-9]{1,3}(?:,?[0-9]{3})*\.[0-9]{2}/;
    console.log(re.test(e.target.value));
    // if (re.test(e.target.value)) {
    setExpenseCategory(e.target.value);
    console.log(expenseCategory);
    // }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.handleFormSubmit(e, {
          expenseCreator: userId,
          trip: tripId,
          totalExpenseAmount,
          category: expenseCategory,
          description,
        });
      }}
    >
      <div className="field">
        <label className="label">Amount</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className="input"
            type="number"
            min="0"
            step=".01"
            // pattern="^\d*(\.\d{0,2})?$"
            placeholder=""
            value={totalExpenseAmount}
            name="totalExpenseAmount"
            onChange={(e) => {
              let num = e.target.value
                .toString()
                .split(".")
                .map((el, i) => (i ? el.split("").slice(0, 2).join("") : el))
                .join(".");

              setTotalExpenseAmount(num);
            }}
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
              <option disabled="disabled" defaultValue={"Select One"}>
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
          onClick={() => props.closeForm()}
          to={`/user/${userId}/trips/${tripId}`}
          className="button mr-4"
        >
          Cancel
        </Link>
      </div>
      {display && <Alert color={theme}>Please complete all fields.</Alert>}
    </form>
  );
};

export default ExpenseForm;
