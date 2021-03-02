import React,{useEffect} from "react";
import { useParams, Link } from "react-router-dom";

const MiniTable = ({ expense}) => {
  const { userId, tripId } = useParams();


  return (
    <div>


      <table className="table">
        <thead>
          <tr>
            <th>Traveler</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {expense.expenseShare.map((traveler) => (
            <tr>
              <th>{traveler.travelerEmail}</th>
              <td>{traveler.shareOfTotalExpense}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MiniTable;
