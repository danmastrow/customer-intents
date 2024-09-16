import { useEffect, useState } from "react";
import { CustomerIntent } from "../models/customer-intents";
import SentimentPieChart from "./sentiment-pie-chart";
import CategoryChart from "./category-chart";
import Placeholder from "./placeholder";

const Dashboard = () => {
  const [customerIntents, setCustomerIntents] = useState<CustomerIntent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/customer-intents`)
      .then((response) => response.json())
      .then((data) => setCustomerIntents(data))
      .catch((error) => {
        console.error(error);
        setError("There was an error loading the dashboard data.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg">
          <h1 className="text-3xl">Dashboard</h1>
          <h2 className="text-sm sm:text-md text-gray-500 mb-4">
            Welcome to your dashboard, the central hub for tracking customer
            feedback and insights.
            <br />
            Here, you can review key metrics, analyze trends, and make
            data-driven decisions.
          </h2>

          <div className="grid xl:grid-cols-2 grid-cols-1 gap-4 mb-4 ">
            <div className="border rounded-md hover:shadow-md transition-all">
              <CategoryChart intents={customerIntents} />
            </div>
            <div className="border rounded-md hover:shadow-md transition-all">
              <SentimentPieChart intents={customerIntents} />
            </div>
          </div>

          <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <Placeholder />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <Placeholder />
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <Placeholder />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
