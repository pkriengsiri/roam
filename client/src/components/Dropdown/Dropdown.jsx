import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import foodAndDining from "../../Assets/Images/food-and-dining.png";
import airfare from "../../Assets/Images/airfare.png";
import lodging from "../../Assets/Images/lodging.png";
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
            <>
              <span>
                <img className="category-icon" src={foodAndDining} alt="" />
                <h1 className="subtitle">Food & Dining</h1>
              </span>
            </>
          )}
          {expense.category === "Airfare" && (
            <>
              <img className="category-icon" src={airfare} alt="" />
              <h1 className="subtitle">Airfare</h1>
            </>
          )}
          {expense.category === "Lodging" && (
            <>
              <img className="category-icon" src={lodging} alt="" />
              <h1 className="subtitle">Lodging</h1>
            </>
          )}
          <Link
            to={`/user/${userId}/trips/${tripId}/expenses/${expense._id}/edit`} className="has-text-dark"
          >
            Edit<i className="edit-expense-icon far fa-edit pl-2 has-text-dark"></i>
          </Link>
        </div>
      </div>
      <div className="columns is-centered">
        <div className="column is-2">
          <h1>
            <strong>Expense Share</strong>
          </h1>
          {expense.expenseShare.map((traveler) => (
            <ul>
              <li>${traveler.shareOfTotalExpense}</li>
            </ul>
          ))}
        </div>
        <div className="column is-2">
          <h1>
            <strong>Person</strong>
          </h1>
          {expense.expenseShare.map((traveler) => (
            <ul>
              <li>{traveler.travelerEmail}</li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
