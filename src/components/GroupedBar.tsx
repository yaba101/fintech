"use client";
import * as d3 from "d3";
import { MouseEvent, useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";

export interface IData {
  label: string;
  value: number;
}

export interface IGroupedData {
  label: string;
  values: number[];
}

interface Props {
  data: IGroupedData[];
}

interface BarProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  onMouseEnter: (e: MouseEvent<SVGPathElement>) => void;
  onMouseLeave: () => void;
}

interface Tooltip {
  x: number;
  y: number;
  index: number;
}

function Bar({
  x,
  y,
  width,
  height,
  color,
  onMouseEnter,
  onMouseLeave,
}: BarProps) {
  const radius = height === 0 ? 0 : width * 0.5;

  return (
    <path
      d={`
      m${x},${y + radius}
      a${radius},${radius} 0 0 1 ${radius},${-radius}
      h${width - 2 * radius}
      a${radius},${radius} 0 0 1 ${radius},${radius}
      v${height - radius}
      h-${width}
      z
    `}
      fill={color}
      onMouseEnter={(event) => onMouseEnter(event)}
      onMouseLeave={onMouseLeave}
    />
  );
}

export default function GroupedBarChart({ data }: Props) {
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const axisBottomRef = useRef<SVGGElement>(null);
  const axisLeftRef = useRef<SVGGElement>(null);

  const margin = { top: 10, right: 0, bottom: 20, left: 30 };
  const width = 700 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const labels = data?.map(({ label }) => label);
  const sublabels = Object.keys(data[0].values);

  const values = data?.map(({ values }) => values).flat();

  const scaleY = d3
    .scaleLinear()
    .domain([0, Math.max(...values)])
    .range([height, 0]);

  const scaleX = d3.scaleBand().domain(labels).range([0, width]).padding(0.5);
  const subscaleX = d3
    .scaleBand()
    .domain(sublabels)
    .range([0, scaleX.bandwidth()])
    .padding(0.3);

  const yAxis = d3
    .axisLeft(scaleY)
    .tickFormat((d) => `${Math.abs(d as number)}k`);

  const numDashedLines = 10;
  const dashedLineInterval = scaleY.domain()[1] / numDashedLines;

  useEffect(() => {
    if (axisBottomRef.current) {
      d3.select(axisBottomRef.current)
        .call(d3.axisBottom(scaleX))
        .selectAll("path")
        .style("stroke-dasharray", "5,5");
    }

    if (axisLeftRef.current) {
      d3.select(axisLeftRef.current)
        .call(yAxis)
        .select("path")
        .style("display", "none");
    }
  }, [scaleX, yAxis]);

  return (
    <div className="py-1 my-3 overflow-x-hidden rounded-md shadow-lg dark:bg-dark bg-gray-50">
      <div className="flex justify-between py-1 my-3 md:px-3 min-w-fit">
        <h4 className="px-1 mt-1 font-bold tracking-tight text-center md:mr-5 xs:text-sm lg:text-medium whitespace-nowrap sm:text-sm lg:text-xl">
          Insights
        </h4>
        <div className="flex justify-between mt-1 md:mr-5 ">
          <button className="w-4 h-4 mt-2 font-medium text-white bg-green-600 rounded-full sm:mx-3 xs:mx-1 xs:w-2 xs:h-2" />
          <p className="mt-1 text-sm xs:text-xs lg:text-base">Income</p>
          <button className="w-4 h-4 mt-2 font-medium text-white bg-red-600 rounded-full sm:mx-3 xs:mx-1 xs:w-2 xs:h-2" />
          <p className="mt-1 text-sm xs:text-xs lg:text-base">Expenses</p>
        </div>
        <div className="xs:mr-l">
          <Dropdown />
        </div>
      </div>

      <svg
        className="w-auto px-3 overflow-x-hidden "
        viewBox={`0 0 ${width + margin.left + margin.right} ${
          height + margin.top + margin.bottom
        }`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "auto" }}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g ref={axisBottomRef} transform={`translate(0, ${height})`} />
          <g ref={axisLeftRef} />
          {data.map(({ label, values }, groupIndex) => (
            <g
              key={`rect-group-${groupIndex}`}
              transform={`translate(${scaleX(label)}, 0)`}
            >
              {values.map((value, barIndex) => (
                <Bar
                  key={`rect-${barIndex}`}
                  x={subscaleX(String(barIndex)) || 0}
                  y={scaleY(value)}
                  width={subscaleX.bandwidth()}
                  height={height - scaleY(value)}
                  color={barIndex === 0 ? "#27674a" : "#df2433"}
                  onMouseEnter={(event) => {
                    setTooltip({
                      x: event.clientX,
                      y: event.clientY,
                      index: groupIndex,
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              ))}
            </g>
          ))}

          {/* Add horizontal dashed lines above the axes */}
          {Array.from({ length: numDashedLines }, (_, i) => (
            <line
              key={`dashed-line-${i}`}
              x1="0"
              x2={width}
              y1={scaleY(dashedLineInterval * (i + 1))}
              y2={scaleY(dashedLineInterval * (i + 1))}
              stroke="#555"
              strokeDasharray="5,5"
            />
          ))}
        </g>
      </svg>
      {tooltip !== null ? (
        <div
          className="fixed px-3 py-1 text-sm text-gray-100 rounded shadow-md pointer-events-none"
          style={{ top: tooltip.y, left: tooltip.x, background: "#454687" }}
        >
          <span className="block mb-2 text-xs font-medium">
            {labels[tooltip.index]} 2023
          </span>
          <span className="block mb-2 text-xs font-medium">
            ${data[tooltip.index].values[0] * 100}.34
          </span>
        </div>
      ) : null}
    </div>
  );
}
