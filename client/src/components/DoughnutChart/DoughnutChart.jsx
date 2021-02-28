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

  const [dataObject, setDataObject] = useState({
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: ["#938DB9", "#F6A465", "#8EE1E0"],
      },
    ],
    labels: ["Food & Dining", "Airfare", "Other"],
  });

  useEffect(() => {
    setSummaryExpenses(calculateExpenseCategoryTotals(expenses));
  }, [expenses]);

  useEffect(() => {
    // console.log(summaryExpenses)
    // console.log(Object.keys(summaryExpenses))
    setSummaryArrays(deconstructMap(summaryExpenses));
  }, [summaryExpenses]);

  useEffect(() => {
    console.log(summaryArrays.dataValues);
    console.log(summaryArrays.colors);
    console.log(summaryArrays.categories);
    // setDataObject({
    //   datasets: [
    //     {
    //       data: summaryArrays?.dataValues,
    //       backgroundColor: summaryArrays?.colors,
    //     },
    //   ],
    //   labels: summaryArrays?.categories,
    // });
  }, [summaryArrays]);

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

  //  map over all expenses
  //  store mapped array as state

  //   useEffect(() => {
  //     API.getExpense('603ad2f2a76c6e231d8cd33a').then((response)=> {
  //         console.log(response.data.totalExpenseAmount);
  //         setData(response.data.totalExpenseAmount);
  //         dataArray.push(data);
  //         console.log(dataArray);

  //     })
  //   }, [])

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
