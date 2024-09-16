import { Button } from "flowbite-react";
import { useEffect } from "react";
import Chart from "react-apexcharts";

const options: any = {
  chart: {
    id: "basic-bar",
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
};
const series = [
  {
    name: "series-1",
    data: [30, 40, 45, 50, 49, 60, 70, 91],
  },
];

function App() {
  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL);
  }, []);
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div>{process.env.REACT_APP_API_URL ?? "No Url"}</div>
      <Chart options={options} series={series} type="bar" width="500" />
      <Button color="dark">Test</Button>
    </div>
  );
}

export default App;
