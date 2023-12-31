"use client";
import * as d3 from "d3";
import { MouseEvent, useEffect, useRef, useState } from "react";
import YearDropDown from "./YearDropDown";
import { formatCurrency } from "@/utils/moneyFormat";
import { getIncomeExpenseData } from "@/utils/incomeExpense";
import { urlEndpoints } from "@/endpoint/urlEndpoint";
import GroupedBarChartSkeleton from "./skeleton/GroupedBarSkeleton";

type GroupedBarChart = {
  year: number;
  month: number;
  month_name: string;
  income: number;
  expense: number;
};

type GroupedBarChartResponse = {
  incomeExpense: GroupedBarChart[];
  succeeded: boolean;
};

interface Props {
  data: GroupedBarChartResponse;
}

interface BarProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  onMouseEnter: (e: MouseEvent<SVGPathElement>) => void;
  onMouseLeave: () => void;
  data: GroupedBarChart;
}

interface Tooltip {
  x: number;
  y: number;
  index: number;
  type: "income" | "expense";
}

function Bar({
  x,
  y,
  width,
  height,
  color,
  onMouseEnter,
  onMouseLeave,
  data,
}: BarProps) {
  const radius = height === 0 ? 0 : width * 0.5;

  return (
    <g>
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
    </g>
  );
}

export default function GroupedBarChart() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [currentData, setCurrentData] = useState({
    incomeExpense: [
      {
        year: currentYear,
        month: 1,
        income: 0,
        expense: 0,
        month_name: "",
      },
    ],
    succeeded: true,
  });
  const [loading, setLoading] = useState(true);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  const minYear = Math.min(
    ...currentData.incomeExpense.map((entry) => entry.year)
  );
  const maxYear = Math.max(
    ...currentData.incomeExpense.map((entry) => entry.year)
  );
  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => minYear + i
  );

  const axisBottomRef = useRef<SVGGElement>(null);
  const axisLeftRef = useRef<SVGGElement>(null);

  const margin = { top: 10, right: 0, bottom: 20, left: 40 };
  const width = 600 - margin.left - margin.right;
  const height = 320 - margin.top - margin.bottom;

  const labels = currentData?.incomeExpense.map(({ month_name }) => month_name);
  const sublabels = ["income", "expense"];

  useEffect(() => {
    async function fetchData() {
      try {
        const url = process.env.NEXT_PUBLIC_BASE_URL;

        const data = await getIncomeExpenseData(
          `${url}/${urlEndpoints["incomeExpense"]}`,
          {
            year: selectedYear,
          }
        );
        setCurrentData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, [selectedYear]);

  const values = currentData.incomeExpense
    .map(({ income, expense }) => [income, expense])
    .flat();

  const scaleY = d3
    .scaleLinear()
    .domain([Math.min(...values), Math.max(...values)])
    .range([height, 0]);

  const scaleX = d3.scaleBand().domain(labels).range([0, width]).padding(0.5);
  const subscaleX = d3
    .scaleBand()
    .domain(sublabels)
    .range([0, scaleX.bandwidth()])
    .padding(0.3);

  const yAxis = d3.axisLeft(scaleY).tickFormat((d) => {
    if (Number(d) >= 1000) {
      return (Number(d) / 1000).toString() + "k";
    } else {
      return d.toString();
    }
  });

  const numDashedLines = 12;
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
    <div className="my-3 overflow-x-hidden rounded-md bg-gray-50 py-1 shadow-lg dark:bg-dark">
      {loading ? (
        <GroupedBarChartSkeleton />
      ) : !currentData.succeeded ? (
        <p className="mx-auto text-center h-96 flex justify-center items-center text-gray-500">
          Error occured. Try again.
        </p>
      ) : currentData.incomeExpense.length === 0 ? (
        <p className="mx-auto text-center h-96 flex justify-center items-center text-gray-500">
          No data Available
        </p>
      ) : (
        <>
          <div className="my-3 flex min-w-fit justify-between py-1 md:px-3">
            <h4 className="mt-1 whitespace-nowrap px-1 text-center font-bold capitalize tracking-tight xs:text-sm md:mr-5 md:text-2xl">
              Insights
            </h4>
            <div className="mt-1 flex justify-between md:mr-5">
              <button className="mt-2 rounded-full bg-green-600 font-medium text-white xs:mx-1 xs:h-2 xs:w-2 sm:mx-3 md:h-4 md:w-4" />
              <p className="mt-1 text-sm xs:text-xs md:text-base">Income</p>
              <button className="mt-2 rounded-full bg-red-600 font-medium text-white xs:mx-1 xs:h-2 xs:w-2 sm:mx-3 md:h-4 md:w-4" />
              <p className="mt-1 text-sm xs:text-xs md:text-base">Expenses</p>
            </div>
            <div className="xs:mr-l">
              <YearDropDown
                selectedYear={selectedYear!}
                onSelectYear={setSelectedYear}
              />
            </div>
          </div>

          <svg
            className="w-auto overflow-x-hidden"
            viewBox={`0 0 ${width + margin.left + margin.right} ${
              height + margin.top + margin.bottom
            }`}
            preserveAspectRatio="xMidYMid meet"
            style={{ width: "100%", height: "auto" }}
          >
            <g transform={`translate(${margin.left}, ${margin.top})`}>
              <g ref={axisBottomRef} transform={`translate(0, ${height})`} />
              <g ref={axisLeftRef} />
              {currentData.incomeExpense.map(
                ({ month_name, income, expense }, groupIndex) => (
                  <g
                    key={`rect-group-${groupIndex}`}
                    transform={`translate(${scaleX(month_name)}, 0)`}
                  >
                    <Bar
                      key={`rect-income-${groupIndex}`}
                      x={subscaleX("income") || 0}
                      y={scaleY(income)}
                      width={subscaleX.bandwidth()}
                      height={height - scaleY(income)}
                      color="#27674a"
                      onMouseEnter={(event) => {
                        setTooltip({
                          x: event.clientX,
                          y: event.clientY,
                          index: groupIndex,
                          type: "income",
                        });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                      data={{
                        year: selectedYear!,
                        month: currentData.incomeExpense[groupIndex].month,
                        month_name,
                        income,
                        expense,
                      }}
                    />

                    <Bar
                      key={`rect-expense-${groupIndex}`}
                      x={subscaleX("expense") || 0}
                      y={scaleY(expense)}
                      width={subscaleX.bandwidth()}
                      height={height - scaleY(expense)}
                      color="#df2433"
                      onMouseEnter={(event) => {
                        setTooltip({
                          x: event.clientX,
                          y: event.clientY,
                          index: groupIndex,
                          type: "expense",
                        });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                      data={{
                        year: selectedYear!,
                        month_name,
                        income,
                        expense,
                        month: currentData.incomeExpense[groupIndex].month,
                      }}
                    />
                  </g>
                )
              )}

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
              className="pointer-events-none fixed rounded px-3 py-1 text-sm text-gray-100 shadow-md"
              style={{
                top: tooltip.y,
                left: tooltip.x,
                background: tooltip.type === "income" ? "#27674a" : "#df2433",
              }}
            >
              <span className="mb-2 block text-xs font-medium">
                {currentData.incomeExpense[tooltip.index].month_name}{" "}
                {selectedYear}
              </span>
              {tooltip.type === "income" ? (
                <span className="mb-2 block text-xs font-semibold">
                  $
                  {formatCurrency(
                    currentData.incomeExpense[tooltip.index].income
                  )}
                </span>
              ) : (
                <span className="mb-2 block text-xs font-semibold">
                  $
                  {formatCurrency(
                    currentData.incomeExpense[tooltip.index].expense
                  )}
                </span>
              )}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
