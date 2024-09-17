import { Chart } from 'react-google-charts'

export const data = [
  ['Task', 'Hours per Day'],
  ['Work', 11],
  ['Eat', 2],
  ['Commute', 2],
  ['Watch TV', 2],
  ['Sleep', 7], // CSS-style declaration
];

export const options = {
  title: 'Ordenes de servicio',
  pieHole: 0.3,
  is3D: false,
};

export const OrdersChart = () => {
  return (
    <Chart
      chartType='PieChart'
      width='100%'
      height='400px'
      data={data}
      options={options}
    />
  );
}
