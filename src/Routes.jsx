import { createBrowserRouter } from "react-router";
import MainLayouts from "./Layouts/MainLayouts";
import Home from "./Pages/Home";
import AllTickets from "./Pages/AllTickets";
import Dashboard from "./Pages/Dashboard";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <MainLayouts></MainLayouts>,
            children: [
                {
                    index: true,
                    element: <Home></Home>
                },
                {
                    path: "/all-tickets",
                    element: <AllTickets></AllTickets>
                },
                {
                    path: "/dashboard",
                    element: <Dashboard></Dashboard>
                }
            ]
            
        }
    ]
)

export default router;