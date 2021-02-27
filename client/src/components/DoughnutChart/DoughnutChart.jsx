import React, {useState} from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = () => {
  const [data, setData] = useState({
    datasets: [
      {
        data: [10, 20, 30],
      },
    ],

    labels: ["Food & Dining", "Airfare", "Other"],
    backgroundColor: [""]
  });

  return (
    <div>
      <Doughnut data={data}/>
    </div>
  );
};

export default DoughnutChart;
