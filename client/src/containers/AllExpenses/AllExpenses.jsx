import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../utils/API";
import "./AllExpenses.css";

const AllExpenses = (props) => {
  const { userId, tripId } = useParams();
  const [destination, setDestination] = useState("");
  const [expenseArray, setExpenseArray] = useState([]);

  useEffect(() => {
    if (tripId) {
      API.getTrip(tripId)
        .then((response) => {
          setExpenseArray(response.data.expenses);
          setDestination(response.data.destination);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  return (
    <div className="container mt-6 pl-6 pr-6">
      <h1 className="title has-text-centered">
        Expenses for {destination} Trip
      </h1>
      <div className="columns is-centered">
        <div className="column is-full has-text-centered">
          <table className="table is-striped is-fullwidth">
            <thead className="expense-table-head has-text-centered">
              <tr>
                <th>Expense</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Contributors</th>
              </tr>
            </thead>
            <tbody className="has-text-centered">
              {expenseArray.map((expense, index) => (
                <tr key={index} className="is-hoverable">
                  <td>{expense.description}</td>
                  <td>{expense.category}</td>
                  <td>${expense.totalExpenseAmount}</td>
                  <td>V</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link
            to={`/user/${userId}/trips/${tripId}`}
            className="button is-primary is-size-5"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllExpenses;
