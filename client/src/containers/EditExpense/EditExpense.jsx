import { useState, useContext, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import React from "react";
import API from "../../utils/API";
import ExpenseForm from "../../components/ExpenseFrom/ExpenseForm";
import AlertContext from "../../contexts/AlertContext";

const EditExpense = () => {
  const history = useHistory();
  const { onDisplay, display, theme } = useContext(AlertContext);
  const { tripId } = useParams();
  const { userId } = useParams();
  const { expenseId } = useParams();

  const handleFormSubmit = (e, formObject) => {
    e.preventDefault();
    if (
      !formObject.expenseCreator ||
      !formObject.totalExpenseAmount ||
      formObject.category === "Select One" ||
      !formObject.category
    ) {
      onDisplay(true, "error");
    } else {
      onDisplay(false);

      API.editExpense(expenseId, formObject)
        .then((response) => {
          console.log(response.data);
        //   history.push(`/user/${userId}/trips/${tripId}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const closeForm = () => {
    onDisplay(false);
  };

  return (
    <div className="container mt-6">
      <h1 className="title has-text-centered">Edit Expense:</h1>
      <div className="columns is-centered">
        <div className="column is-4">
          <ExpenseForm
            handleFormSubmit={handleFormSubmit}
            closeForm={closeForm}
          />
        </div>
      </div>
    </div>
  );
};

export default EditExpense;