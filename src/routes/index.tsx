import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/dashboard/Dashboard";
import React from "react";
import DasboardHome from "../pages/DasboardHome";
// import Category_Management from "../pages/Category_Management";

import Transactions from "../pages/Webiner";
import SettingsPage from "../pages/Settings";
import Notifications from "../pages/Notifications";
import Auth from './../layout/auth/Auth';
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import VerifyEmail from "../pages/VerifyEmail";
import SetNewPassword from "../pages/SetNewPassword";
import CreateNewCourse from "../pages/CreateNewCourse";
import Support from "../component/dashHome/Support";
import Earning from "../pages/Earning";
import Webiner from "../pages/Webiner";
import Totalusers from "../component/admin/manageUsers/Totalusers";
import Content from "../component/admin/Content";
import TransactionsStatus from "../component/Transactions/TransactionStatus";
import Recordings from "../component/student/Recordings";

import Recources from "../component/student/Recources";
import Mycourses from "../component/student/Mycourses";
import MycourseCard from "../pages/MycourseCard";
import CoursePage from "../pages/Section&Lecture";
import DaynamicRecording from "../component/student/DaynamicRecording";
import ProtectedRoute from "./ProtectedRoute";








const handleNotifications = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("16++++++++++++++Notification clicked!");
    // Add your notification handling logic here
};



const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard handleNotifications={handleNotifications} />,
        children: [
            // instructor menu item --------------
            {
                path: "/",
                element: <ProtectedRoute allowedRoles={["instructor"]}>

                    <DasboardHome />,
                </ProtectedRoute>
            },
            {
                path: "/notifications",
                element: <Notifications />,
            },
            {
                path: "/createnewcourse",
                element: <ProtectedRoute allowedRoles={["instructor"]}>
                    <CreateNewCourse />
                </ProtectedRoute>,
            },
            {
                path: "/course/:id",
                element: <ProtectedRoute allowedRoles={["instructor"]}>

                    <CoursePage />,
                </ProtectedRoute>
            },
            {
                path: "/mycourse",
                element: <ProtectedRoute allowedRoles={["instructor"]}>

                    <MycourseCard />,
                </ProtectedRoute>
            },

            {
                path: "/earning",
                element: <ProtectedRoute allowedRoles={["instructor"]}>

                    <Earning />,
                </ProtectedRoute>
            },
            {
                path: "/webiner",
                element: <ProtectedRoute allowedRoles={["instructor"]}>

                    <Webiner />,
                </ProtectedRoute>
            },


            // admin menu item --------------
            {
                path: "/usermanagement",
                element: <ProtectedRoute allowedRoles={["admin"]}>

                    <Totalusers />,
                </ProtectedRoute>
            },
            {
                path: "/content",
                element: <ProtectedRoute allowedRoles={["admin"]}>

                    <Content />
                </ProtectedRoute>
            },
            {
                path: "/transactions",
                element: <ProtectedRoute allowedRoles={["admin"]}>

                    <TransactionsStatus />,
                </ProtectedRoute>
            },

            // student menu item ---------------
            {
                path: "/recordings",
                element: <ProtectedRoute allowedRoles={["user"]}>

                    <Recordings />
                </ProtectedRoute>
            },
            {
                path: "/recordings/:id",
                element: <ProtectedRoute allowedRoles={["user"]}>

                    <DaynamicRecording />
                </ProtectedRoute>
            },
            {
                path: "/mycourcess",
                element: <ProtectedRoute allowedRoles={["user"]}>

                    <Mycourses />
                </ProtectedRoute>
            },
            {
                path: "/resources",
                element: <ProtectedRoute allowedRoles={["user"]}>

                    <Recources />
                </ProtectedRoute>
            },





            // this is for all 
            {
                path: "/support",
                element: <Support />,
            },
            {
                path: "/settings",
                element: <SettingsPage />,
            },

        ]
    },
    {
        path: "/auth",
        element: <Auth />,
        children: [
            {
                path: "/auth",
                element: <Login />,
            },
            {
                path: "/auth/login",
                element: <Login />,
            },
            {
                path: "/auth/forget-password",
                element: <ForgetPassword />,
            },
            {
                path: "/auth/verify",
                element: <VerifyEmail />,
            },
            {
                path: "/auth/set-new-password",
                element: <SetNewPassword />,
            },

        ],
    },
])

export default router;