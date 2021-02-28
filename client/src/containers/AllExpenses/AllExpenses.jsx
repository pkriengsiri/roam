import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../utils/API";
import "./AllExpenses.css"

const AllExpenses = (props) => {
  const { userId, tripId } = useParams();
  const [destination, setDestination] = useState("");
  useEffect(() => {
    if (tripId) {
      API.getTrip(tripId)
        .then((response) => {
          // console.log(response.data);
          setDestination(response.data.destination);
          //   const responseStartDate = new Date(response.data.startDate);
          //   const responseEndDate = new Date(response.data.endDate);
          //   setStartDate(responseStartDate);
          //   setEndDate(responseEndDate);
          //   setTravelers(response.data.travelers);
          //   setImageUrl(response.data.imageUrl);
          //   setExpenses(response.data.expenses);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  return (
    <div className="container mt-6 pl-6 pr-6">
      <h1 className="title has-text-centered">Expenses for {destination}</h1>
      <div className="columns">
        <div className="column is-full">
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
              <tr className="is-hoverable">
                <td>Bubble Tea</td>
                <td>Food & Dining</td>
                <td>$50</td>
                <td>v</td>
              </tr>
              <tr className="is-hoverable">
                <td>Cheesecake Factory</td>
                <td>Food & Dining</td>
                <td>$300</td>
                <td>v</td>
              </tr>
              <tr className="is-hoverable">
                <td>Groceries</td>
                <td>Food & Dining</td>
                <td>$540</td>
                <td>v</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllExpenses;
