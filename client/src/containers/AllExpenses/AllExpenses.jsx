import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MiniTable from "../../components/MiniTable/MiniTable";
import API from "../../utils/API";
import "./AllExpenses.css";

const AllExpenses = (props) => {
  const { userId, tripId } = useParams();
  const [destination, setDestination] = useState("");
  const [expenseArray, setExpenseArray] = useState([]);
  const [displayContributors, setDisplayContributors] = useState(false);
  let buttonDataId;
  let contributorsDataId;
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

  const handleContributors = (e) => {
    e.preventDefault();
    // console.log(e.target.dataset.id);
    // Render new row with Mini Table information
    // Where e.target.dataset.id, set button status to
    // console.log(e.target.parentNode.parentNode.parentNode)

    // console.log(e.target.parentNode.parentNode.parentNode.children[5].dataset)
    // buttonDataId = e.target.dataset.id;
    // console.log(buttonDataId);
    setDisplayContributors();

    // if (!displayContributors) {
    //   //  If ids match, display contributors
    // } else {
    //   setDisplayContributors("");
    // }
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
                    <td className="is-vcentered">${expense.totalExpenseAmount}</td>
                    {/* Dropdown for MiniTable goes here */}
                    <td className="is-vcentered">
                      {/* <i
                        onClick={handleContributors}
                        data-id={index}
                        className="button fas fa-angle-down"
                        aria-hidden="true"
                      ></i> */}
                      <div className="dropdown is-hoverable is-right">
                        <div className="dropdown-trigger ">
                          <button
                            className="button"
                            aria-haspopup="true"
                            aria-controls="dropdown-menu3"
                          >
                            <span className="icon is-small">
                              <i
                                className="fas fa-angle-down"
                                aria-hidden="true"
                              ></i>
                            </span>
                          </button>
                        </div>
                        <div
                          className="dropdown-menu"
                          id="dropdown-menu3"
                          role="menu"
                        >
                          <div className="dropdown-content">
                            <a href="#" className="dropdown-item">
                              <MiniTable />
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  {/* {displayContributors} */}
                  {/* {buttonDataId && ( */}
                  {/* <tr data-id={index}>
                      <td>Test</td>
                      <td>Test</td>
                      <td>Test</td>
                      <td>Test</td>
                    </tr> */}
                  {/* )} */}
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
