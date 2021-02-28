import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import API from "../../utils/API";
import ExpenseContext from "../../contexts/ExpenseContext";

const dataArray = [];

const DoughnutChart = ({ expenses }) => {
  const [data, setData] = useState([]);
  const [summaryExpenses, setSummaryExpenses] = useState({});
  const [summaryArrays, setSummaryArrays] = useState({
    labels: [
      "Activities",
      "Airfare",
      "Car & Gas",
      "Food & Dining",
      "Entertainment",
      "Lodging",
      "Other",
    ],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: [
          "#938DB9", // light purple
          "#F6A465", // light orange
          "#8EE1E0", // light blue
          "#938DB9", // light purple
          "#F6A465", // light orange
          "#8EE1E0", // light blue
          "#938DB9", // light purple,
        ],
      },
    ],
  });


  useEffect(() => {
    setSummaryExpenses(calculateExpenseCategoryTotals(expenses));
  }, [expenses]);

  useEffect(() => {
    // console.log(summaryExpenses)
    // console.log(Object.keys(summaryExpenses))
    setSummaryArrays(deconstructMap(summaryExpenses));
  }, [summaryExpenses]);


  // color palette
  const colorPalette = [
    "#938DB9", // light purple
    "#F6A465", // light orange
    "#8EE1E0", // light blue
    "#938DB9", // light purple
    "#F6A465", // light orange
    "#8EE1E0", // light blue
    "#938DB9", // light purple
  ];

  // total all received expenses for the trip
  const calculateExpenseCategoryTotals = (arrayOfExpenseObjects) => {
    let expensesMap = {};
    for (let i = 0; i < arrayOfExpenseObjects.length; i++) {
      let category = arrayOfExpenseObjects[i].category;
      if (category in expensesMap) {
        expensesMap[category] += arrayOfExpenseObjects[i].totalExpenseAmount;
      } else {
        expensesMap[category] = arrayOfExpenseObjects[i].totalExpenseAmount;
      }
    }
    return expensesMap;
  };

  // deconstruct the summary map into arrays to fit the donut chart tree structure
  const deconstructMap = (mappedObject) => {
    // make array for labels
    const categories = Object.keys(mappedObject);
    // make array for data
    const dataValues = categories.map((el) => mappedObject[el]);
    const colors = categories.map((el, index) => colorPalette[index]);
    return {
      labels: categories,
      datasets: [{ data: dataValues, backgroundColor: colors }],
    };
  };


  return (
    <div>
      {}
      <Doughnut
        data={summaryArrays}
        width={200}
        height={200}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};

export default DoughnutChart;
