<tr key={expense._id} className="is-hoverable expense-row">
  <td className="is-vcentered">{convertDate(expense.date)}</td>
  {/* <td className="is-vcentered">{expense.description}</td> */}
  <td className="is-vcentered">{expense.category}</td>
  <td className="is-vcentered">${expense.totalExpenseAmount}</td>
  {/* Dropdown for MiniTable goes here */}
  <td className="is-vcentered">
    <p
      className="details"
      onClick={handleContributors}
      data-id={expense._id}
      data-index={index}
      // className="button fas fa-angle-down"
      aria-hidden="true"
    >
      Details
    </p>
  </td>
  <td>
    <Link to={`/user/${userId}/trips/${tripId}/expenses/${expense._id}/edit`}>
      <i className="edit-expense-icon far fa-edit m-1 "></i>
    </Link>
  </td>
</tr>;
