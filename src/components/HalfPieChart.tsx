import * as d3 from "d3";

type DataItem = {
  name: string;
  value: number;
};
type DonutChartProps = {
  width: number;
  height: number;
  colors: any[];
  data: DataItem[];
};

const MARGIN = 40;

const HalfDonutChart = ({ width, height, data, colors }: DonutChartProps) => {
  const radius = Math.min(width, height) / 2 - MARGIN;

  const arc = d3.arc().innerRadius(90).outerRadius(radius);

  const totalValue = d3.sum(data, (d) => d.value);

  let startAngle = -90;

  return (
    <>
      <svg
        width={width}
        height={height}
        className="-mb-16 "
        style={{ display: "inline-block" }}
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

            return <path key={i} d={path!} fill={colors[i]?.color} />;
          })}
        </g>
      </svg>
    </>
  );
};
export default HalfDonutChart;
