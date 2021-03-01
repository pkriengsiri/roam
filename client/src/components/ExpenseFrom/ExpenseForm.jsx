import React, { useState, useContext, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import "./ExpenseForm.css";
import Alert from "../Alert/Alert";
import AlertContext from "../../contexts/AlertContext";
import API from "../../utils/API";

const ExpenseForm = (props) => {
  const { onDisplay, display, theme } = useContext(AlertContext);
  const { userContext } = useContext(UserContext);

  const [totalExpenseAmount, setTotalExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [description, setDescription] = useState("");
  const [expenseShare, setExpenseShare] = useState([]);
  const [expenseBalanced, setExpenseBalanced] = useState(true);

  const { tripId } = useParams();
  const { userId } = useParams();
  const { expenseId } = useParams();

  useEffect(() => {
    if (expenseId) {
      API.getExpense(expenseId)
        .then((response) => {
          // console.log(response.data);
          setTotalExpenseAmount(response.data.totalExpenseAmount);
          setExpenseCategory(response.data.category);
          setDescription(response.data.description);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleTotalExpenseChange = () => {
    console.log("hi");
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
          expenseShare,
          expenseBalanced,
        });
      }}
    >
      <div className="field">
        <label className="label">Amount</label>
        <div className="control has-icons-left has-icons-right">
          <input
            autoFocus
            className="input"
            type="number"
            min="0"
            step=".01"
            placeholder="Enter an amount"
            value={totalExpenseAmount}
            name="totalExpenseAmount"
            onChange={(e) => {
              let num = e.target.value
                .toString()
                .split(".")
                .map((el, i) => (i ? el.split("").slice(0, 2).join("") : el))
                .join(".");

              setTotalExpenseAmount(num);
              setExpenseShare([
                { travelerEmail: userContext.email, shareOfTotalExpense: num },
              ]);
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
              required
            >
              <option disabled="disabled" value="" className="is-hidden">
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
