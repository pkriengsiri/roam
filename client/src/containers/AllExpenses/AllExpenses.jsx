import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../utils/API";
import MiniTable from "../../components/MiniTable/MiniTable";
import "./AllExpenses.css";

const AllExpenses = (props) => {
  const { userId, tripId } = useParams();
  const [destination, setDestination] = useState("");
  const [expenseArray, setExpenseArray] = useState([]);
  const [buttonDisplayState, setButtonDisplayState] = useState(false);
  const [displayContributors, setDisplayContributors] = useState([]);

  useEffect(() => {
    if (tripId) {
      API.getTrip(tripId)
        .then((response) => {
          setExpenseArray(response.data.expenses);
          setDestination(response.data.destination);
          const expArr = response.data.expenses;
          const newArr = [];
          expArr.forEach(expense => {newArr.push(false)});
          setDisplayContributors(newArr);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleContributors = (e) => {
    e.preventDefault();
    // console.log(displayContributors);
    const displayContributorsArr = [...displayContributors];
    console.log(displayContributorsArr);
    let buttonDataId;
    buttonDataId = e.target.dataset.id;
    displayContributorsArr[buttonDataId] = !displayContributorsArr[buttonDataId];
    console.log(displayContributorsArr);
    setDisplayContributors(displayContributorsArr);

    
    // if (buttonDisplayState) {
    //   var element = document.querySelectorAll(`[data-row]`);
    //   element.forEach((element) => element.classList.remove("is-hidden"));
    //   setButtonDisplayState(false);
    // } else {
    //   let buttonDataId;
    //   buttonDataId = e.target.dataset.id;
    //   console.log(buttonDataId);
    //   var element = document.querySelector(`[data-row="${buttonDataId}"]`);
    //   element.classList.add("is-hidden");
    //   setButtonDisplayState(true);
    // }
    // setDisplayContributors();
  };
  return (
    <div className="container mt-6 pl-6 pr-6">
      <h1 className="title has-text-centered">
        Expenses for {destination} Trip
      </h1>
      <div className="columns is-centered">
        <div className="column is-full has-text-centered">
          <table className="table  is-fullwidth expenses-table is-striped">
            <thead className="expense-table-head has-text-centered">
              <tr>
                <th className="has-text-light">Expense</th>
                <th className="has-text-light">Category</th>
                <th className="has-text-light">Amount</th>
                <th className="has-text-light">Contributors</th>
              </tr>
            </thead>
            <tbody className="has-text-centered expenses-body">
              {expenseArray.map((expense, index) => (
                <>
                  <tr key={index} className="is-hoverable expense-row">
                    <td className="is-vcentered">{expense.description}</td>
                    <td className="is-vcentered">{expense.category}</td>
                    <td className="is-vcentered">
                      ${expense.totalExpenseAmount}
                    </td>
                    {/* Dropdown for MiniTable goes here */}
                    <td className="is-vcentered">
                      <i
                        onClick={handleContributors}
                        data-id={index}
                        className="button fas fa-angle-down"
                        aria-hidden="true"
                      ></i>
                    </td>
                  </tr>
                  {displayContributors[index] && <tr className="has-text-dark" data-row={index}>
                    <td></td>
                    <td>
                      <MiniTable />
                    </td>
                    <td>
                      <ul>
                        <li>$10</li>
                        <li>$20</li>
                        <li>$20</li>
                        <li>$15</li>
                      </ul>
                    </td>
                    <td>
                      <ul>
                        <li>Tony</li>
                        <li>Pete</li>
                        <li>Molly</li>
                        <li>Jeana Rose</li>
                      </ul>
                    </td>
                  </tr>}
                </>
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
