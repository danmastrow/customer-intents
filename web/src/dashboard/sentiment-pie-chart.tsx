import { CustomerIntent } from "../models/customer-intents";
import Chart from "react-apexcharts";

export type CategoryChartProps = {
  intents: CustomerIntent[];
};

const options = {
  chart: {
    type: "pie" as any,
    animations: {
      enabled: true,
      easing: "easeinout" as any,
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150,
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350,
      },
    },
  },
  labels: ["Positive", "Neutral", "Negative"],
  colors: ["#2ECC71", "#F1C40F", "#E74C3C"],
};

const SentimentPieChart = ({ intents }: CategoryChartProps) => {
  const series = intents.reduce(
    (acc, intent) => {
      if (intent.sentiment === "Positive") {
        acc[0]++;
      } else if (intent.sentiment === "Neutral") {
        acc[1]++;
      } else if (intent.sentiment === "Negative") {
        acc[2]++;
      }
      return acc;
    },
    [0, 0, 0]
  );
  return <Chart options={options} series={series} type="pie" />;
};

export default SentimentPieChart;
