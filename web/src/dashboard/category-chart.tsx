import { CustomerIntent } from "../models/customer-intents";
import Chart from "react-apexcharts";

export type CategoryChartProps = {
  intents: CustomerIntent[];
};

const CategoryChart = ({ intents }: CategoryChartProps) => {
  const categoryData = intents.reduce((acc, intent) => {
    if (acc[intent.category]) {
      acc[intent.category] += 1;
    } else {
      acc[intent.category] = 1;
    }
    return acc;
  }, {} as { [key: string]: number });

  const sortedData = Object.entries(categoryData)
    .sort((a, b) => b[1] - a[1])
    .map(([_, value]) => value);

  const series = [
    {
      name: "Customer call count",
      data: Object.values(sortedData),
    },
  ];

  const options = {
    chart: {
      type: "bar" as any,
      background: "#f3f4f6", // Medium gray background
    },
    colors: [
      "#FF5733", // Red-Orange
      "#33FF77", // Green
      "#3357FF", // Blue
      "#F4C724", // Yellow
      "#C70039", // Dark Red
      "#900C3F", // Burgundy
      "#581845", // Purple
      "#28B463", // Emerald Green
      "#1F618D", // Navy Blue
      "#F39C12", // Orange
      "#D35400", // Burnt Orange
      "#8E44AD", // Violet
    ],
    plotOptions: {
      bar: {
        barHeight: "100%",
        distributed: true, // Distribute colors to each bar
        horizontal: true,
        dataLabels: {
          position: "bottom",
        },
      },
    },
    dataLabels: {
      enabled: true,
      textAnchor: "start" as any,
      style: {
        colors: ["#FFF"], // Change the text color to black
      },
      formatter: function (val: any, opt: any) {
        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
      },
      offsetX: 20,
      dropShadow: {
        enabled: true,
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      categories: Object.keys(categoryData),
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
  };

  return (
    <Chart
      height={350}
      width="100%"
      options={options}
      series={series}
      type="bar"
    />
  );
};

export default CategoryChart;
