import React from "react";
import * as d3 from "d3";

type DonutChartProps = {
  category: string;
  sum: number;
}[];

const HalfDonutChart = ({
  data,
  colors,
}: {
  data: DonutChartProps;
  colors: string[];
}) => {
  const totalValue = d3.sum(data, (d) => d.sum);

  let startAngle = -90;

  const margin = { top: 20, right: 0, bottom: 0, left: 0 };
  const width = 280 - margin.left - margin.right;
  const height = 280 - margin.top - margin.bottom;
  const radius = Math.min(width, height) / 2;
  const arc = d3.arc().innerRadius(90).outerRadius(radius);

  return (
    <div className="mx-auto w-full py-6 ">
      <svg
        className="w-auto overflow-x-hidden px-3 "
        viewBox={`0 0 ${width + margin.left + margin.right} ${height / 2}`}
        style={{ width: "100%", height: "auto" }}
      >
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          {data.length === 0 ? (
            <path
              d={
                arc({
                  startAngle: 180,
                  endAngle: Math.PI,
                  innerRadius: 0,
                  outerRadius: 0,
                })!
              }
              fill="#282a2e"
              stroke="none"
            />
          ) : (
            data.map((item, i) => {
              const endAngle = startAngle + (item.sum / totalValue) * 180;

              const path = arc({
                startAngle: (startAngle * Math.PI) / 180,
                endAngle: (endAngle * Math.PI) / 180,
                innerRadius: 0,
                outerRadius: 0,
              });

              startAngle = endAngle;

              return <path key={i} d={path!} fill={colors[i]} />;
            })
          )}
        </g>
      </svg>
    </div>
  );
};

export default HalfDonutChart;
