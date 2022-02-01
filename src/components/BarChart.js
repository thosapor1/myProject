import React from "react";
import { Bar } from "react-chartjs-2";

export default function BarChart(props) {
  const { data } = props;
  return (
    <div>
      <Bar
        // height='auto'
        width="720px"
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          title: { text: "test Chart" },
          scales: {
            yAexs: [
              {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
}
