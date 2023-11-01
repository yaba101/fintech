import React from "react";
import * as d3 from "d3";

type DataItem = {
  title: string;
  value: number;
};
type DonutChartProps = {
  width: number;
  height: number;
  data: DataItem[];
};

const MARGIN = 40;

const HalfDonutChart = ({ width, height, data }: DonutChartProps) => {
  const colors = ["#146f43", "#2d23c2", "#b3a641", "#eb34b4"];
  const radius = Math.min(width, height) / 2 - MARGIN;

  const arc = d3.arc().innerRadius(90).outerRadius(radius);

  const totalValue = d3.sum(data, (d) => d.value);

  let startAngle = -90;

  return (
    <>
      <svg
        height={height}
        className="-mb-16 w-auto mx-auto text-center h-auto"
        style={{ display: "inline-block " }}
      >
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          {data.map((item, i) => {
            const endAngle = startAngle + (item.value / totalValue) * 180;

            const path = arc({
              startAngle: (startAngle * Math.PI) / 180,
              endAngle: (endAngle * Math.PI) / 180,
              innerRadius: 0,
              outerRadius: 0,
            });

            startAngle = endAngle;

            return <path key={i} d={path!} fill={colors[i]} />;
          })}
        </g>
      </svg>
    </>
  );
};

export default HalfDonutChart;
