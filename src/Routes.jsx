import { createBrowserRouter } from "react-router";
import MainLayouts from "./Layouts/MainLayouts";
import Home from "./Pages/Home";
import AllTickets from "./Pages/AllTickets";
import Dashboard from "./Pages/Dashboard";
import AuthLaouts from "./Layouts/AuthLaouts";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

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
            
        },
        {
            path: "/auth",
            element: <AuthLaouts></AuthLaouts>,
            children: [
                {
                    path: "/auth/login",
                    element: <Login></Login>
                },
                {
                    path: "/auth/register",
                    element: <Register></Register>
                }
            ]
        }
    ]
)

export default router;