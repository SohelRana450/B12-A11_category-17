
import AuthLaouts from "./Layouts/AuthLaouts";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import DashboardLayout from "./Layouts/DashboardLayout";
import { createBrowserRouter } from "react-router";
import MainLayouts from "./Layouts/MainLayouts";
import Home from "./Pages/Home";
import AllTickets from "./Pages/AllTickets";
import VendorProfile from "./Pages/Vendor/VendorProfile";
import AddTicket from "./Pages/Vendor/AddTicket";
import MyAddedTicket from "./Pages/Vendor/MyAddedTicket";
import RequestBooking from "./Pages/Vendor/RequestBooking";
import Revenue from "./Pages/Vendor/Revenue";

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
                    element: <AllTickets/>
                },
                
            ]
            
        },
        {
                    path: "/dashboard",
                    element: <DashboardLayout></DashboardLayout>,
                    children: [
                        
                        {
                            path: "/dashboard/vendor/profile",
                            element:<VendorProfile/>
                        },
                        {
                            path: "/dashboard/vendor/add-ticket",
                            element: <AddTicket/>
                        },
                        {
                            path: "/dashboard/vendor/my-tickets",
                            element: <MyAddedTicket/>
                        },
                        {
                            path: "/dashboard/vendor/requests",
                            element: <RequestBooking/>
                        }
                        ,
                        {
                            path: "/dashboard/vendor/revenue",
                            element: <Revenue/>
                        },
                       
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