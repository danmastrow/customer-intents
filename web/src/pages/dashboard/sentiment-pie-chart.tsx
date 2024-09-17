import Chart from "react-apexcharts";
import { sentimentAtom } from "../../state/state";
import { useAtom } from "jotai";

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

const SentimentPieChart = () => {
  const [series] = useAtom(sentimentAtom); // Using the derived seriesAtom

  return (
    <Chart
      height={350}
      width="100%"
      options={options}
      series={series}
      type="pie"
    />
  );
};

export default SentimentPieChart;
