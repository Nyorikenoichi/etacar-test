import React, { useRef } from 'react';
import * as d3 from 'd3';
import { HistoryItem } from '../../lib/interfaces/historyItem';

export interface AreaChartProps {
  history: HistoryItem[];
  width: number;
  height: number;
}

interface ChartData {
  date: Date;
  value: number;
}

export const AreaChart: React.FC<AreaChartProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);

  const data: ChartData[] = props.history.slice(-150).map((item) => {
    return { date: new Date(item.time), value: parseFloat(item.priceUsd) };
  });

  const margin = { top: 0, right: 0, bottom: 30, left: 60 };
  const width = props.width - margin.left - margin.right;
  const height = props.height - margin.top - margin.bottom;

  d3.selectAll('svg').remove();
  const svg = d3
    .select(ref.current)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const x = d3
    .scaleTime()
    .domain(
      d3.extent(data, (d) => {
        return d.date;
      }) as [Date, Date]
    )
    .range([0, width]);
  svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(x));

  const y = d3
    .scaleLinear()
    .domain([
      d3.min(data, () => {
        return Math.min(
          ...data.map(
            (dt) => (dt as unknown as ChartData).value - (dt as unknown as ChartData).value * 0.1
          )
        );
      }),
      d3.max(data, () => {
        return Math.max(
          ...data.map(
            (dt) => (dt as unknown as ChartData).value + (dt as unknown as ChartData).value * 0.1
          )
        );
      }),
    ] as number[])
    .range([height, 0]);

  svg.append('g').call(d3.axisLeft(y));

  svg
    .append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'green')
    .attr('stroke-width', 1.5)
    .attr(
      'd',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      d3
        .line()
        .x((d) => {
          return x((d as unknown as { date: number }).date);
        })
        .y((d) => {
          return y((d as unknown as ChartData).value);
        })
    );

  const tooltip = d3.select('#tooltip');
  const tooltipCircle = svg
    .append('circle')
    .attr('class', 'tooltip-circle')
    .attr('r', 6)
    .attr('stroke', '#af9358')
    .attr('fill', 'none')
    .attr('stroke-width', 2)
    .style('opacity', 0);
  const xAxisLine = svg
    .append('g')
    .append('rect')
    .attr('class', 'dotted')
    .attr('stroke-width', '1px')
    .attr('width', '.5px')
    .attr('height', height);

  const onMouseMove = (event: PointerEvent) => {
    const mousePosition = d3.pointer(event);
    const hoveredDate = x.invert(mousePosition[0]);

    const getDistanceFromHoveredDate = (d: ChartData) =>
      Math.abs(d.date.getTime() - hoveredDate.getTime());
    const closestIndex = d3.leastIndex(
      data,
      (a, b) => getDistanceFromHoveredDate(a) - getDistanceFromHoveredDate(b)
    );
    const closestDataPoint: ChartData = data[closestIndex ? closestIndex : 0];

    const closestXValue = closestDataPoint.date;
    const closestYValue = closestDataPoint.value;

    const formatDate = d3.timeFormat('%B %-d, %Y');
    tooltip.select('#date').text(formatDate(closestXValue));

    const formatInternetUsage = (d: number) => `${d3.format('.1f')(d)}$`;
    tooltip.select('#internet').html(formatInternetUsage(closestYValue));

    const dx = x(closestXValue) + margin.left;
    const dy = y(closestYValue) + margin.top;

    //Grab the x and y position of our closest point,
    //shift our tooltip, and hide/show our tooltip appropriately

    tooltip.style('transform', `translate(calc(${dx}px), calc(100% + ${dy}px))`);

    tooltip.style('opacity', 1);

    tooltipCircle.attr('cx', x(closestXValue)).attr('cy', y(closestYValue)).style('opacity', 1);

    xAxisLine.attr('x', x(closestXValue));
  };

  function onMouseLeave() {
    tooltip.style('opacity', 0);

    tooltipCircle.style('opacity', 0);
  }
  svg
    .append('rect')
    .attr('class', 'listening-rect')
    .attr('width', width)
    .attr('height', height)
    .on('mousemove', (event) => onMouseMove(event))
    .on('mouseleave', onMouseLeave);

  return (
    <div className="area-chart" ref={ref}>
      <div id="tooltip" className="tooltip">
        <div className="tooltip-date">
          <span id="date"></span>
        </div>
        <div className="tooltip-Internet">
          <span id="internet"></span>
        </div>
      </div>
    </div>
  );
};
