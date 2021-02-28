import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import API from "../../utils/API";

const DoughnutChart = ({ expenses }) => {
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
          "#938DB9", // light purple "Blue Bell"
          "#F6A465", // light orange "sandy brown"
          "#8EE1E0", // light blue "middle blue green"
          "#5A5388", // darker purple "purple navy"
          "#F48E3F", // darker orange "cadmium orange"
          "#33C1BF", // darker blue "maximum blue green"
          "#2E3560", // darkest purple "space cadet",
        ],
      },
    ],
  });

  useEffect(() => {
    setSummaryExpenses(calculateExpenseCategoryTotals(expenses));
  }, [expenses]);

  useEffect(() => {
    setSummaryArrays(deconstructMap(summaryExpenses));
  }, [summaryExpenses]);

  // color palette
  const colorPalette = 
  {
      Activities:"#938DB9", // light purple "Blue Bell"
      Airfare:"#F6A465", // light orange "sandy brown"
      "Car & Gas":"#8EE1E0", // light blue "middle blue green"
      "Food & Dining":"#5A5388", // darker purple "purple navy"
      Entertainment:"#F48E3F", // darker orange "cadmium orange"
      Lodging:"#33C1BF", // darker blue "maximum blue green"
      Other:"#2E3560", // darkest purple "space cadet"
  };


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
    const categories = Object.keys(mappedObject).sort();
    // make array for data
    const dataValues = categories.map((el) => mappedObject[el]);
    const colors = categories.map((el) => colorPalette[el]);
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
