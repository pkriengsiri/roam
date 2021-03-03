import React, { useState, useContext, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import TripContext from "../../contexts/TripContext";
import "./ExpenseForm.css";
import Alert from "../Alert/Alert";
import AlertContext from "../../contexts/AlertContext";
import API from "../../utils/API";
import { SingleDatePicker } from "react-dates";
import "./SingleDatePicker.css";
import moment from "moment";

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
  const [date, setDate] = useState(null);
  const [focused, setFocused] = useState(null);
  const [calendarStack, setCalendarStack] = useState("horizontal");
  const [shareType, setShareType] = useState("Solo");

  const { tripId } = useParams();
  const { userId } = useParams();
  const { expenseId } = useParams();

  // at mount, populate form for edit trip
  useEffect(() => {
    if (expenseId) {
      API.getExpense(expenseId)
        .then((response) => {
          const date = moment(response.data.date);
          setTotalExpenseAmount(response.data.totalExpenseAmount);
          setExpenseCategory(response.data.category);
          setDescription(response.data.description);
          setDate(moment(date));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  // at mount, get trip information and initialize expenseShare array
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

  // calculate remainder/ variance when changes are made to total or breakdown
  useEffect(() => {
    let sumOfShare = expenseShare;
    sumOfShare = expenseShare.reduce(
      (sum, traveler) => sum + traveler.shareOfTotalExpense,
      0
    );
    const remainder = parseFloat((totalExpenseAmount - sumOfShare).toFixed(2));
    setRemainder(remainder);
    if (remainder === 0) {
      setExpenseBalanced(true);
    } else if (remainder !== 0) {
      setExpenseBalanced(false);
    }
  }, [expenseShare, totalExpenseAmount]);

  // check window viewport to set orientation of calendar so it is responsive in mobile
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setCalendarStack("vertical");
    } else {
      setCalendarStack("horizontal");
    }
  }, [window.innerWidth]);

  // use effect for setting each traveler's share of the total expense
  useEffect(() => {
    let updateArray = trip.travelers.map((traveler) => ({
      travelerEmail: traveler.travelerEmail,
      shareOfTotalExpense: 0,
    }));
    const total = totalExpenseAmount !== "" ? totalExpenseAmount : 0;
    if (shareType === "Solo" && trip.travelers.length > 0) {
      let updateExpenseCreator = updateArray.find(
        (el) => el.travelerEmail === userContext.email
      );
      updateArray = updateArray.filter(
        (el) => el.travelerEmail !== userContext.email
      );
      updateExpenseCreator.shareOfTotalExpense = total;
      updateArray.push(updateExpenseCreator);
      updateArray.sort((a, b) =>
        a.travelerEmail.localeCompare(b.travelerEmail)
      );
      setExpenseShare([...updateArray]);
    } else if (shareType === "Share Evenly" && trip.travelers.length > 0) {
      let subtotal = 0;
      let evenSplit = parseFloat((total / updateArray.length).toFixed(2));
      for (let i = 0; i < updateArray.length; i++) {
        updateArray[i].shareOfTotalExpense = evenSplit;
        if (i === updateArray.length - 1) {
          updateArray[i].shareOfTotalExpense = parseFloat(
            (total - subtotal).toFixed(2)
          );
        }

        subtotal += updateArray[i].shareOfTotalExpense;
      }
      updateArray.sort((a, b) =>
        a.travelerEmail.localeCompare(b.travelerEmail)
      );
      setExpenseShare([...updateArray]);
    }
  }, [shareType, totalExpenseAmount, trip, userContext]);

  // force number input to be in USD
  const handleNumericChange = (e) => {
    let num = e.target.value
      .toString()
      .toString()
      .split(".")
      .map((el, i) => (i ? el.split("").slice(0, 2).join("") : el))
      .join(".");
    num = num === "" ? 0 : num;

    // if numeric change is for the total expense, set state for total expense
    if (e.target.id === "totalExpenseAmount") {
      setTotalExpenseAmount(parseFloat(num));

      // if numeric change is for custom split shared expense, set state of expenseShare
    } else if (e.target.name === "shareExpenseAmount") {
      let updateTravelerEmail = e.target.id;
      let updateArray = expenseShare;

      if (shareType === "Custom Split" && trip.travelers.length > 0) {
        let updateTravelerCustomSplit = updateArray.find(
          (el) => el.travelerEmail === updateTravelerEmail
        );
        updateArray = updateArray.filter(
          (el) => el.travelerEmail !== updateTravelerEmail
        );
        updateTravelerCustomSplit.shareOfTotalExpense = parseFloat(num);
        updateArray.push(updateTravelerCustomSplit);
        updateArray.sort((a, b) =>
          a.travelerEmail.localeCompare(b.travelerEmail)
        );
        setExpenseShare([...updateArray]);
      }
    }
  };

  return (
    <form
      id="expense-form"
      onSubmit={(e) => {
        e.preventDefault();
        props.handleFormSubmit(e, {
          date: date,
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
        <SingleDatePicker
          date={date}
          onDateChange={(date) => setDate(date)}
          focused={focused}
          onFocusChange={({ focused }) => setFocused(focused)}
          id="date"
          showDefaultInputIcon={true} // calendar icon
          showClearDate={true} // clear dates with x button
          orientation={calendarStack}
          isOutsideRange={() => false}
          numberOfMonths={1}
        />
        <label className="label">Amount</label>
        <div className={focused ? "is-hidden" : "control has-icons-left"}>
          <input
            // autoFocus
            className="input numeric-input amount-input"
            type="number"
            min="0"
            step=".01"
            placeholder="100"
            value={totalExpenseAmount === 0 ? "" : totalExpenseAmount}
            name="totalExpenseAmount"
            id="totalExpenseAmount"
            onChange={(e) => handleNumericChange(e)}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-dollar-sign"></i>
          </span>
        </div>
      </div>

      {/* select how to split expense */}
      <div
        className={focused ? "is-hidden" : "buttons has-addons"}
      >
        <button
          type="button"
          className={
            shareType === "Solo"
              ? "button is-primary is-selected is-small"
              : "button is-small"
          }
          onClick={(e) => setShareType(e.target.innerHTML)}
        >
          Solo
        </button>
        <button
          type="button"
          className={
            shareType === "Share Evenly"
              ? "button is-primary is-selected is-small"
              : "button is-small"
          }
          onClick={(e) => setShareType(e.target.innerHTML)}
        >
          Share Evenly
        </button>
        <button
          type="button"
          className={
            shareType === "Custom Split"
              ? "button is-primary is-selected is-small"
              : "button is-small"
          }
          onClick={(e) => setShareType(e.target.innerHTML)}
        >
          Custom Split
        </button>
      </div>

      {/* drop down form for splitting expense */}
      {shareType !== "Solo" && (
        <div className="expense-share-mini-form">
          {expenseShare.map((traveler) => (
            <div
              className="field is-horizontal ml-5"
              key={traveler.travelerEmail}
            >
              <div className="field-label is-small ">
                <label className="label">{traveler.travelerEmail}</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control">
                    <input
                      className="input is-small numeric-input"
                      disabled={shareType !== "Custom Split"}
                      type="number"
                      min="0"
                      step=".01"
                      placeholder={traveler.shareOfTotalExpense}
                      value={
                        traveler.shareOfTotalExpense === 0
                          ? ""
                          : traveler.shareOfTotalExpense
                      }
                      name="shareExpenseAmount"
                      id={traveler.travelerEmail}
                      onChange={(e) => handleNumericChange(e)}
                    />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* conditinally render custom remainder check if on custom split */}
      {shareType === "Custom Split" && (
        <div className="field is-horizontal ml-6 mt-2">
          <div className="field-label is-small">
            {expenseBalanced ? (
              <label className="label balanced">Balanced</label>
            ) : (
              <label className="label unbalanced">Unbalanced</label>
            )}
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input
                  className="input is-small numeric-input"
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
      )}

      <div className="field">
        <label className="label">Category</label>
        <div className={focused ? "is-hidden" : "control"}>
          <div className="select">
            <select
              name="category"
              value={expenseCategory}
              onChange={(e) => setExpenseCategory(e.target.value)}
              required // TODO: add this back. Issue with clicking share buttons
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
          <button
            className="button is-primary"
            type="submit"
            form="expense-form"
          >
            Submit
          </button>
        </div>

        <Link
          onClick={() => props.closeForm()}
          to={`/user/${userId}/trips/${tripId}/expenses`}
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
