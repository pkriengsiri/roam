import React, { useState, useContext, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import TripContext from "../../contexts/TripContext";
import "./ExpenseForm.css";
import Alert from "../Alert/Alert";
import AlertContext from "../../contexts/AlertContext";
import API from "../../utils/API";
import { SingleDatePicker } from "react-dates";

const ExpenseForm = (props) => {
  const { onDisplay, display, theme } = useContext(AlertContext);
  const { userContext } = useContext(UserContext);
  const { tripContext, setTripContext } = useContext(TripContext);
  const [trip, setTrip] = useState({ travelers: [] });

  const [totalExpenseAmount, setTotalExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [description, setDescription] = useState("");
  const [expenseShare, setExpenseShare] = useState([
    { travelerEmail: "", shareOfTotalExpense: 0 },
  ]);
  const [expenseBalanced, setExpenseBalanced] = useState(true);
  const [remainder, setRemainder] = useState(0);

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

  useEffect(() => {
    API.getTrip(tripId)
      .then((response) => {
        setTrip(response.data);
        setExpenseShare(
          response.data.travelers.map((traveler) => ({
            travelerEmail: traveler.travelerEmail,
            shareOfTotalExpense: 0,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let sumOfShare = expenseShare;
    sumOfShare = expenseShare.reduce(
      (sum, traveler) => sum + traveler.shareOfTotalExpense,
      0
    );
    setRemainder(totalExpenseAmount - sumOfShare);
  }, [expenseShare]);

  const handleTotalExpenseChange = (e) => {
    let num = e.target.value
      .toString()
      .split(".")
      .map((el, i) => (i ? el.split("").slice(0, 2).join("") : el))
      .join(".");

    setTotalExpenseAmount(num);
    let updateArray = expenseShare;
    // console.log(
    //   updateArray.find((el) => el.travelerEmail === userContext.email)
    // );
    let updateExpenseCreatorShare = updateArray.find(
      (el) => el.travelerEmail === userContext.email
    );
    updateArray = updateArray.filter(
      (el) => el.travelerEmail !== userContext.email
    );
    updateExpenseCreatorShare.shareOfTotalExpense = num;
    setExpenseShare([...updateArray, updateExpenseCreatorShare]);
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
        <label className="label">Expense Date</label>
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
            onChange={handleTotalExpenseChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-dollar-sign"></i>
          </span>
        </div>
      </div>
      <div className="">
        <button className="button is-primary">Share Evenly</button>

        <button className="button mr-4 is-light">Custom Split</button>
      </div>

      {/* drop down form for splitting expense */}

      {expenseShare.map((traveler) => (
        <div
          className="field is-horizontal ml-5 mt-2"
          key={traveler.travelerEmail}
        >
          <div className="field-label is-small">
            <label className="label">{traveler.travelerEmail}</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input
                  className="input is-small"
                  type="number"
                  min="0"
                  step=".01"
                  placeholder={traveler.shareOfTotalExpense}
                  value={traveler.shareOfTotalExpense}
                  name="shareExpenseAmount"
                  id={traveler.travelerEmail}
                />
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="field is-horizontal ml-5 mt-2">
        <div className="field-label is-small">
          <label className="label">Remainder</label>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control">
              <input
                className="input is-small"
                type="number"
                min="0"
                step=".01"
                placeholder={remainder}
                value={remainder}
                name="remaining"
                id="remaining"
                disabled
              />
            </p>
          </div>
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
            maxLength="30"
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
