import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import foodAndDining from "../../Assets/Images/food-and-dining.png";
import airfare from "../../Assets/Images/airfare.png";
import lodging from "../../Assets/Images/lodging.png";
import activities from "../../Assets/Images/activities.png";
import carAndGas from "../../Assets/Images/car-and-gas.png";
import entertainment from "../../Assets/Images/entertainment.png";
import other from "../../Assets/Images/other.png";
import "./Dropdown.css";

const Dropdown = ({ expense }) => {
  const { userId, tripId } = useParams();

  return (
    <div className="mb-3 mt-3">
      {/* <h1 className="pb-5">Expense Creator: {expense.expenseCreator.email}</h1> */}
      <div className="columns is-centered is-gapless is-vcentered">
        <div className="column is-4 has-text-centered">
          {expense.category === "Food & Dining" && (
            <span>
              <img className="category-icon" src={foodAndDining} alt="" />
              <h1 className="subtitle">Food & Dining</h1>
            </span>
          )}
          {expense.category === "Airfare" && (
            <span>
              <img className="category-icon" src={airfare} alt="" />
              <h1 className="subtitle">Airfare</h1>
            </span>
          )}
          {expense.category === "Lodging" && (
            <span>
              <img className="category-icon" src={lodging} alt="" />
              <h1 className="subtitle">Lodging</h1>
            </span>
          )}
          {expense.category === "Activities" && (
            <span>
              <img className="category-icon" src={activities} alt="" />
              <h1 className="subtitle">Activities</h1>
            </span>
          )}
          {expense.category === "Car & Gas" && (
            <span>
              <img className="category-icon" src={carAndGas} alt="" />
              <h1 className="subtitle">Car & Gas</h1>
            </span>
          )}
          {expense.category === "Entertainment" && (
            <span>
              <img className="category-icon" src={entertainment} alt="" />
              <h1 className="subtitle">Entertainment</h1>
            </span>
          )}
          {expense.category === "Other" && (
            <span>
              <img className="category-icon" src={other} alt="" />
              <h1 className="subtitle">Other</h1>
            </span>
          )}
          <Link
            to={`/user/${userId}/trips/${tripId}/expenses/${expense._id}/edit`}
            className="has-text-dark"
          >
           
            Edit
            <i className="edit-expense-icon far fa-edit pl-2 has-text-dark"></i>
          </Link>
        </div>
        <div className="column is-4 is-centered">
          <h1 className="mb-5 pt-2 has-text-centered">
          <strong className="mr-2">Expense Creator: </strong>{expense.expenseCreator.email}
          </h1>
          <table className="table dropdown-table has-text-centered is-bordered">
            <thead>
              <tr className="dropdown-head">
                <th className="has-text-light">Expense Share</th>
                <th className="has-text-light">Person</th>
              </tr>
            </thead>
            <tbody className="dropdown-body">
              {expense.expenseShare.map((traveler, index) => (
                <tr className="dropdown-row" key={traveler.travelerEmail}>
                  <td>
                    {"$"}
                    {traveler.shareOfTotalExpense}
                  </td>
                  <td>{traveler.travelerEmail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
