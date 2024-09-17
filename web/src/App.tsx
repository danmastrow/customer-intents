import Dashboard from "./pages/dashboard/page";
import Sidebar from "./layout/sidebar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReviewCalls from "./pages/review-calls/page";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { fetchCustomerIntentsAtom } from "./state/state";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Sidebar />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "review-calls",
        element: <ReviewCalls />,
      },
    ],
  },
]);

function App() {
  const [, fetchCustomerIntents] = useAtom(fetchCustomerIntentsAtom);

  useEffect(() => {
    fetchCustomerIntents();
  }, [fetchCustomerIntents]);
  return <RouterProvider router={router} />;
}

export default App;
