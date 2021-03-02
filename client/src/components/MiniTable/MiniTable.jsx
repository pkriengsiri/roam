import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const MiniTable = ({ expense }) => {
  const { userId, tripId } = useParams();

  return (
    <>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>
        {expense.expenseShare.map((traveler) => (
          <ul>
            <li>{traveler.shareOfTotalExpense}</li>
          </ul>
          // <td></td>
          // <th>{traveler.travelerEmail}</th>
        ))}
      </td>
      <td>
        {expense.expenseShare.map((traveler) => (
          <ul>
            <li>{traveler.travelerEmail}</li>
          </ul>
          // <td></td>
          // <th>{traveler.travelerEmail}</th>
        ))}
      </td>
    </>
  );
};

export default MiniTable;
