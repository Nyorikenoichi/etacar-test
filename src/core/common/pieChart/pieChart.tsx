import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { BriefcaseItem } from '../../lib/interfaces/briefcaseItem';

export interface PieChartProps {
  briefcase: BriefcaseItem[];
  width: number;
  height: number;
  children?: string;
}

interface ChartData {
  name: string;
  value: number;
}

export const PieChart: React.FC<PieChartProps> = (props) => {
  const data: ChartData[] = props.briefcase.map((item) => {
    return { name: item.name, value: item.count * item.initialPrice };
  });

  const width = props.width;
  const height = props.height;

  const radius = Math.min(width, height) / 2 - 5;

  useEffect(() => {
    if (!d3.select('.pie-chart').selectAll('svg').empty()) {
      d3.select('.pie-chart').selectAll('svg').remove();
    }
    const svg = d3
      .select('.pie-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3
      .scaleOrdinal()
      .domain(data.map((item) => item.name))
      .range(d3.schemeSet2);

    const pie = d3.pie<ChartData>().value((d: ChartData) => {
      return d.value;
    });
    const dataPie = pie(data);

    const arcGenerator = d3.arc<ChartData>().innerRadius(0).outerRadius(radius);

    svg
      .selectAll('mySlices')
      .data(dataPie)
      .enter()
      .append('path')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .attr('d', arcGenerator)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .attr('fill', (d) => color(d.data.name))
      .attr('stroke', 'none')
      .style('stroke-width', '.5px')
      .style('opacity', 0.7);

    svg
      .selectAll('mySlices')
      .data(dataPie)
      .enter()
      .append('text')
      .text(function (d) {
        return d.data.name;
      })
      .attr('transform', function (d) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return `translate(${arcGenerator.centroid(d)})`;
      })
      .style('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', '600')
      .style('fill', '#fff');
  });
  return <div className="pie-chart">{props.children}</div>;
};
