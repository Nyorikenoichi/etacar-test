import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { HistoryItem } from '../../lib/interfaces/historyItem';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const monthNames = [
  'Jan',
  'Feb',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

export const options = {
  responsive: true,
};

export interface AreaChartProps {
  history: HistoryItem[];
}

export const AreaChart: React.FC<AreaChartProps> = ({ history }) => {
  const labels = history.map((item) => {
    const date = new Date(item.time);
    return `${date.getDate()} ${monthNames[date.getMonth()]}`;
  });
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Currency price',
        data: history.map((item) => item.priceUsd),
        borderColor: '#76c893',
        backgroundColor: 'rgba(203, 242, 217, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} style={{ maxHeight: '450px' }} />;
};
