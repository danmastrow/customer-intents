import SentimentPieChart from "./sentiment-pie-chart";
import CategoryChart from "./category-chart";
import Placeholder from "./placeholder";
import IntentsTable from "../../components/intents-table";
import { useAtom } from "jotai";
import { customerIntentsAtom } from "../../state/state";

const Dashboard = () => {
  const [customerIntents] = useAtom(customerIntentsAtom);

  return (
    <>
      <div className="p-4 md:ml-48">
        <div className="p-4 rounded-lg">
          <h1 className="text-3xl">Dashboard</h1>
          <h2 className="text-sm sm:text-md text-gray-500 mb-4">
            Welcome to your dashboard, the central hub for tracking customer
            feedback and insights.
            <br />
            Here, you can review key metrics, analyze trends, and make
            data-driven decisions.
          </h2>

          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4">
            <div className="border rounded-md hover:shadow-md transition-all bg-gray-100">
              <h3 className="sm:text-2xl text-xl ml-6 mt-4 font-light">
                Call category summary
              </h3>
              <h4 className="ml-6 text-gray-700">
                {customerIntents.length} calls total.
              </h4>
              <CategoryChart />
            </div>
            <div className="border rounded-md hover:shadow-md transition-all">
              <h3 className="sm:text-2xl text-xl mt-4 ml-4 font-light">
                Customer sentiment overview
              </h3>

              <SentimentPieChart />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-16">
            <h3 className="sm:text-2xl ml-4 font-light text-xl">
              Latest customer calls
            </h3>

            <IntentsTable />
            <div className="grid sm:grid-cols-2 grid-cols-1">
              <Placeholder />
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
