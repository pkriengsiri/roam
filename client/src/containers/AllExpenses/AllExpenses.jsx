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
    console.log(e.target.parentNode.parentNode.parentNode)

    console.log(e.target.parentNode.parentNode.parentNode.children[5].dataset)
    buttonDataId = e.target.dataset.id;
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
          <table className="table  is-fullwidth expenses-table">
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
                <>
                  <tr key={index} className="is-hoverable">
                    <td>{expense.description}</td>
                    <td>{expense.category}</td>
                    <td>${expense.totalExpenseAmount}</td>
                    {/* Dropdown for MiniTable goes here */}
                    <td>
                      <i
                        onClick={handleContributors}
                        data-id={index}
                        class="button fas fa-angle-down"
                        aria-hidden="true"
                      ></i>
                      {/* <div class="dropdown is-hoverable">
                        <div class="dropdown-trigger ">
                          <button
                            class="button"
                            aria-haspopup="true"
                            aria-controls="dropdown-menu3"
                          >
                            <span class="icon is-small">
                              <i
                                class="fas fa-angle-down"
                                aria-hidden="true"
                              ></i>
                            </span>
                          </button>
                        </div>
                        <div
                          class="dropdown-menu"
                          id="dropdown-menu3"
                          role="menu"
                        >
                          <div class="dropdown-content">
                            <a href="#" class="dropdown-item">
                              <MiniTable />
                            </a>
                            <a href="#" class="dropdown-item">
                              Modifiers
                            </a>
                            <a href="#" class="dropdown-item">
                              Grid
                            </a>
                            <a href="#" class="dropdown-item">
                              Form
                            </a>
                            <a href="#" class="dropdown-item">
                              Elements
                            </a>
                            <a href="#" class="dropdown-item">
                              Components
                            </a>
                            <a href="#" class="dropdown-item">
                              Layout
                            </a>
                            <hr class="dropdown-divider" />
                            <a href="#" class="dropdown-item">
                              More
                            </a>
                          </div>
                        </div>
                      </div> */}
                    </td>
                  </tr>
                  {/* {displayContributors} */}
                  {/* {buttonDataId && ( */}
                    <tr data-id={index}>
                      <td>Test</td>
                      <td>Test</td>
                      <td>Test</td>
                      <td>Test</td>
                    </tr>
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
