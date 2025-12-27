
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
import UserProfile from "./Pages/Users.jsx/UserProfile";
import BookedTickets from "./Pages/Users.jsx/BookedTickets";
import TransactionHistory from "./Pages/Users.jsx/TransactionHistory";
import Details from "./components/Details";
import PaymentSuccess from "./Pages/PaymentSuccess";
import AdminProfile from "./Pages/Admin/AdminProfile";
import ManageTickets from "./Pages/Admin/ManageTickets";
import ManageUsers from "./Pages/Admin/ManageUsers";
import AdvertiseTickets from "./Pages/Admin/AdvertiseTickets";
import Profile from "./components/Profile";
import PrivateRoute from "./Provider/PrivateRoute";
import UpdateAddedTicket from "./components/UpdateAddedTicket";
import VendorRoute from "./Provider/VendorRoute";
import AdminRoute from "./Provider/AdminRoute";
import Error from "./components/Error";

const router = createBrowserRouter(
    [
        {
            path: "/",
            errorElement: <Error/>,
            element: <MainLayouts></MainLayouts>,
            children: [
                {
                    index: true,
                    element: <Home></Home>
                },
                {
                    path: "/all-tickets",
                    element:<PrivateRoute> <AllTickets/></PrivateRoute>
                },
                {
                    path: "/all-tickets/:id",
                    element: <PrivateRoute><Details/></PrivateRoute>
                },
                {
                    path: "/payment-success",
                    element: <PrivateRoute><PaymentSuccess/></PrivateRoute>
                }
            ]
            
        },
        {
                    path: "/dashboard",
                    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
                    children: [
                        {
                            path:"/dashboard",
                            element: <PrivateRoute><Profile/></PrivateRoute>
                        },
                        {
                            path: "/dashboard/user/profile",
                            element: <PrivateRoute><UserProfile/></PrivateRoute>
                        },
                        {
                            path: "/dashboard/user/booked-tickets",
                            element: <PrivateRoute><BookedTickets/></PrivateRoute>
                        },
                        {
                            path: "/dashboard/user/transactions",
                            element: <PrivateRoute><TransactionHistory/></PrivateRoute>
                        },
                        {
                            path: "/dashboard/vendor/profile",
                            element: 
                            <PrivateRoute>
                            <VendorRoute>
                            <VendorProfile/></VendorRoute></PrivateRoute>
                        },
                        {
                            path: "/dashboard/vendor/add-ticket",
                            element: <PrivateRoute><VendorRoute><AddTicket/></VendorRoute></PrivateRoute>
                        },
                        {
                            path: "/dashboard/vendor/my-tickets",
                            element: <PrivateRoute><VendorRoute><MyAddedTicket/></VendorRoute></PrivateRoute>
                        },
                        {
                            path: "/dashboard/vendor/update/ticket/:id",
                            element: <PrivateRoute><VendorRoute><UpdateAddedTicket/></VendorRoute></PrivateRoute>
                        },
                        {
                            path: "/dashboard/vendor/requests",
                            element: <PrivateRoute><VendorRoute><RequestBooking></RequestBooking></VendorRoute></PrivateRoute>
                        }
                        ,
                        {
                            path: "/dashboard/vendor/revenue",
                            element: <PrivateRoute><VendorRoute><Revenue/></VendorRoute></PrivateRoute>
                        },
                        {
                            path: "/dashboard/admin/profile",
                            element: <PrivateRoute><AdminRoute><AdminProfile/></AdminRoute></PrivateRoute>
                        },
                        {
                            path: "/dashboard/admin/manage-tickets",
                            element: <PrivateRoute><AdminRoute><ManageTickets/></AdminRoute></PrivateRoute>
                        }
                        ,
                        {
                            path: "/dashboard/admin/manage-users",
                            element: <PrivateRoute><AdminRoute><ManageUsers/></AdminRoute></PrivateRoute>
                        }
                        ,
                        {
                            path: "/dashboard/admin/advertise-tickets",
                            element: <PrivateRoute><AdminRoute><AdvertiseTickets/></AdminRoute></PrivateRoute>
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