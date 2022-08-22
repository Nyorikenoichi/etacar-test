import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { HistoryItem } from '../../lib/interfaces/historyItem';
import { formatFloat } from '../../lib/helpers/formatFloat';

export interface AreaChartProps {
  history: HistoryItem[];
  width: number;
  height: number;
  children?: string;
}

interface ChartData {
  date: Date;
  value: number;
}

export const AreaChart: React.FC<AreaChartProps> = (props) => {
  const data: ChartData[] = props.history.slice(-150).map((item) => {
    return { date: new Date(item.time), value: parseFloat(item.priceUsd) };
  });

  const margin = { top: 10, right: 20, bottom: 30, left: 60 };
  const width = props.width - margin.left - margin.right;
  const height = props.height - margin.top - margin.bottom;

  useEffect(() => {
    if (!d3.select('.area-chart').selectAll('svg').empty()) {
      d3.select('.area-chart').selectAll('svg').remove();
    }
    const svg = d3
      .select('.area-chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    console.log(svg);
    const x = d3
      .scaleTime()
      .domain(
        d3.extent(data, (d) => {
          return d.date;
        }) as [Date, Date]
      )
      .range([0, width]);

    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .style('font-family', 'roboto')
      .call(d3.axisBottom(x));

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

    svg.append('g').style('font-family', 'roboto').call(d3.axisLeft(y));

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

    const tooltip = d3.select('.area-chart__tooltip');
    const tooltipCircle = svg
      .append('circle')
      .attr('class', 'area-chart__tooltip-circle')
      .attr('r', 6)
      .attr('stroke', '#af9358')
      .attr('fill', 'none')
      .attr('stroke-width', 2)
      .style('opacity', 0);
    const xAxisLine = svg
      .append('g')
      .append('rect')
      .attr('class', 'area-chart__vertical-line')
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
      tooltip.select('.date').text(formatDate(closestXValue));

      tooltip.select('.price').html(`$${formatFloat(closestYValue)}`);

      const dx = x(closestXValue) + margin.left;
      const dy = y(closestYValue) + margin.top;

      tooltip
        .style('transform', `translate(calc(${dx}px), calc(100% + ${dy}px))`)
        .style('opacity', 1);

      tooltipCircle.attr('cx', x(closestXValue)).attr('cy', y(closestYValue)).style('opacity', 1);
      xAxisLine.attr('x', x(closestXValue));
    };

    const onMouseLeave = () => {
      tooltip.style('opacity', 0);

      tooltipCircle.style('opacity', 0);
    };

    svg
      .append('rect')
      .attr('class', 'area-chart__listening-rect')
      .attr('width', width)
      .attr('height', height)
      .on('mousemove', (event) => onMouseMove(event))
      .on('mouseleave', onMouseLeave);
  });

  return (
    <div className="area-chart" data-cy="area-chart">
      {props.children}
      <div className="area-chart__tooltip">
        <div className="area-chart__tooltip-date">
          <span className="date"></span>
        </div>
        <div className="area-chart__tooltip-price">
          <span className="price"></span>
        </div>
      </div>
    </div>
  );
};
