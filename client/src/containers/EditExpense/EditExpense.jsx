import { useState, useContext, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import React from "react";
import API from "../../utils/API";
import ExpenseForm from "../../components/ExpenseFrom/ExpenseForm";
import AlertContext from "../../contexts/AlertContext";
import DeleteModal from "../../components/DeleteModal/DeleteModal";

const EditExpense = () => {
  const history = useHistory();
  const { onDisplay, display, theme } = useContext(AlertContext);
  const { tripId } = useParams();
  const { userId } = useParams();
  const { expenseId } = useParams();
  const [deleteModalState, setDeleteModalState] = useState(false);

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
          history.push(`/user/${userId}/trips/${tripId}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const closeForm = () => {
    onDisplay(false);
  };
  
  const closeDeleteModal = (e) => {
    e.preventDefault();
    setDeleteModalState(false);
  };

  const togglesDeleteModal = (e) => {
    e.preventDefault();

    setDeleteModalState(true);
  };

  const handleDeleteClick = () => {
    API.deleteExpense(expenseId)
      .then((response) => {
        console.log(response);
        history.push(`/user/${userId}/trips/${tripId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {deleteModalState && (
        <DeleteModal
          handleDeleteClick={handleDeleteClick}
          closeDeleteModal={closeDeleteModal}
        />
      )}
      <div className="container mt-6">
        <div className="columns is-centered is-vcentered">
          <div className="column is-3">
            <h1 className="title has-text-centered">Edit Expense</h1>
          </div>
          <div className="column is-1">
            <a onClick={togglesDeleteModal}>
              <i className="far fa-trash-alt fa-lg"></i>
            </a>
          </div>
        </div>
        <div className="columns is-centered">
          <div className="column is-4">
            <ExpenseForm
              handleFormSubmit={handleFormSubmit}
              closeForm={closeForm}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditExpense;
