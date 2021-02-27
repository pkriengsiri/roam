import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = () => {
  const [data, setData] = useState({
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: [
            "#938DB9",
            "#F6A465",
            "#8EE1E0",
          ],
      },
      
    ],

    // labels: ["Food & Dining", "Airfare", "Other"],
   
    labels: ["Food & Dining", "Airfare", "Other"],
  });

  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};

export default DoughnutChart;
