import React from "react";
import { Chart } from "react-google-charts";

export default function ChartMonitor(props) {
  const { data, options } = props;
  return (
    <>
      <Chart
        chartType="ComboChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </>
  );
}
