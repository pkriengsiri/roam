import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../utils/API";
import Dropdown from "../../components/Dropdown/Dropdown";
import "./AllExpenses.css";

const AllExpenses = (props) => {
  const { userId, tripId } = useParams();
  const [destination, setDestination] = useState("");
  const [expenseArray, setExpenseArray] = useState([]);
  const [displayContributors, setDisplayContributors] = useState([]);

  useEffect(() => {
    console.log(expenseArray)
    if (tripId) {
      API.getTrip(tripId)
        .then((response) => {
          setExpenseArray(response.data.expenses);
          setDestination(response.data.destination);
          // Create an array to hold display state of contributor row and set value to false
          const expArr = response.data.expenses;
          const newArr = [];
          expArr.forEach((expense) => {
            newArr.push(false);
          });
          // Set the state to the new array
          setDisplayContributors(newArr);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleContributors = (e) => {
    e.preventDefault();
    // Create a copy of the displayContributors array
    const displayContributorsArr = [...displayContributors];
    // Det the id of the button being clicked

    let buttonDataIndex;
    buttonDataIndex = e.target.dataset.index;
    // Change the value of the item in the array being clicked
    displayContributorsArr[buttonDataIndex] = !displayContributorsArr[
      buttonDataIndex
    ];
    // Set the state
    setDisplayContributors(displayContributorsArr);
  };

  // Method to convert dates from response
  const convertDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString();
  };

  return (
    <div className="container mt-6 pl-6 pr-6 expenses-container">
    
      <div className="columns ">
        <div className="column is-full">
          {expenseArray.length === 0 ? (<h1 className="title has-text-centered">There are no expenses for your trip to {destination}.</h1>) : (
            <>
              <h1 className="title has-text-centered">
              Expenses for {destination} Trip
            </h1>
          <table className="table  is-fullwidth expenses-table is-striped">
            <thead className="expense-table-head ">
              <tr>
                {/* <th className="has-text-light"></th> */}
                <th className="has-text-light">Date</th>
                <th className="has-text-light">Description</th>
                {/* <th className="has-text-light">Category</th> */}
                <th className="has-text-light">Amount</th>
                <th className="has-text-light"></th>
              </tr>
            </thead>
            <tbody className="expenses-body">
              {expenseArray.map((expense, index) => (
                <>
                  <tr key={expense.id} className="is-hoverable expense-row">
                  
                    <td className="is-vcentered">
                      {convertDate(expense.date)}
                    </td>
                    <td className="is-vcentered">{expense.description}</td>
                    {/* <td className="is-vcentered">{expense.category}</td> */}
                    <td className="is-vcentered">
                      ${expense.totalExpenseAmount}
                    </td>
                    {/* Dropdown for Dropdown goes here */}
                    <td className="is-vcentered">
                      <span className="details-link">
                        Details
                        <i
                          onClick={handleContributors}
                          data-id={expense._id}
                          data-index={index}
                          className="fas fa-caret-square-down pl-2"
                        ></i>
                      </span>
                    </td>
                  </tr>
                  {displayContributors[index] && (
                    <tr
                      className="has-text-dark details-dropdown"
                      data-row={index}
                    >
                      <td colSpan="6">
                        <div>
                          {/* Mini-table goes here */}
                          <Dropdown expense={expense} />
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
          </>
  )}
          <div className="columns is-centered">
            <div className="column is-12 has-text-centered">
              <Link
                to={`/user/${userId}/trips/${tripId}`}
                className="button is-primary is-size-5 mr-2"
              >
                Trip Details
              </Link>
              <Link
                to={`/user/${userId}/trips/${tripId}/expenses/new`}
                className="button is-light is-size-5 ml-2"
                type="submit"
              >
                Create Expense
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllExpenses;
