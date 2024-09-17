import Dashboard from "./dashboard/page";
import Sidebar from "./layout/sidebar";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

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
        element: <div className="p-4">Todo review calls here.</div>,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
