import React, { useState, useEffect, useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import API from "../../utils/API";
import ExpenseContext from "../../contexts/ExpenseContext";

const dataArray = [];

const DoughnutChart = () => {

const { expenseContext, setExpenseContext } = useContext(ExpenseContext);

const [data, setData] = useState([]);

  const [dataObject, setDataObject] = useState({
    datasets: [
      {
        
        data: [10,20, 30],
        backgroundColor: [
            "#938DB9",
            "#F6A465",
            "#8EE1E0",
          ],
      },
      
    ],
    labels: ["Food & Dining", "Airfare", "Other"],
    
   
    
  });

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
      <Doughnut data={dataObject} width={200} height={200} options={{ maintainAspectRatio: false}}/>
    </div>
  );
};

export default DoughnutChart;
