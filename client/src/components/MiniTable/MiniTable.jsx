import React, { useEffect, useState } from "react";

const MiniTable = ({ expenses }) => {
  const [expenseShare, setExpenseShare] = useState([]);
  useEffect(() => {
    // console.log(expenses)
    // const mappedExpenses = expenses.map((expense) => expense.expenseShare);
    // console.log(mappedExpenses)
    // const expenseShareArray = mappedExpenses.map((contributor) => contributor);
    // setExpenseShare(expenseShareArray[1]);
    // console.log(expenseShare);
  }, []);

  return (
    <>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>
        {expenses.map((expense) => {
          // expense.map(expenseShare=>(
          //   expenseShare.map(share=>(console.log(share)))
          // console.log(expense)
          console.log(expense);
          const expenseShare = expense.expenseShare;
          return expenseShare.map((contributor) => (
            <ul>
              <li>{contributor.shareOfTotalExpense}</li>
            </ul>
          ));
        })}
      </td>
      <td>
        {expenses.map((expense) => {
          // expense.map(expenseShare=>(
          //   expenseShare.map(share=>(console.log(share)))
          // console.log(expense)
          console.log(expense);
          const expenseShare = expense.expenseShare;
          return expenseShare.map((contributor) => (
            <ul>
              <li>{contributor.travelerEmail}</li>
            </ul>
          ));
        })}
      </td>
    </>
  );
};

export default MiniTable;
