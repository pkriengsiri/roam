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
import API from "../../utils/API";

const Dropdown = ({ expense }) => {
  const { userId, tripId } = useParams();

  useEffect(() => {
    console.log(expense);
    // getExpenseCreator()
  }, []);

  // const getExpenseCreator = () => {
  //   console.log(expense)
  //   API.getUser(expense.expenseCreator).then(response=>{
  //     console.log(response.data.email)
  //   })
  // }

  return (
    <div className="has-text-centered mb-3 mt-3">
      <div className="columns is-centered">
        <div className="column is-12">
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
      </div>
      <h1 className="pb-5">Expense Creator: {expense.expenseCreator.email}</h1>
      <div className="columns is-centered">
        <table>
          <thead>
           
            <th >Expense Share</th>
            <th>Person</th>
          </thead>
          <tbody>
            {expense.expenseShare.map((traveler) => (
              <tr>
                {/* <td>$</td> */}
                <td>{"$"}{traveler.shareOfTotalExpense}</td>
                {/* <td className="has-text-right">{traveler.shareOfTotalExpense}</td> */}
                <td>{traveler.travelerEmail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dropdown;
