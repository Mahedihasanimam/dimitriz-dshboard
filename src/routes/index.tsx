import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/dashboard/Dashboard";
import React from "react";
import DasboardHome from "../pages/DasboardHome";
import Category_Management from "../pages/Category_Management";

import Transactions from "../pages/Webiner";
import SettingsPage from "../pages/Settings";
import Notifications from "../pages/Notifications";
import Auth from './../layout/auth/Auth';
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import VerifyEmail from "../pages/VerifyEmail";
import SetNewPassword from "../pages/SetNewPassword";
import Seller_Profile from "../pages/Seller_Profile";
import Settings_personalInformation from "../pages/Settings_personalInformation";
import SettingsFaq from "../pages/SettingsFaq";
import SettingsTermsAndConditions from "../pages/SettingsTermsAndConditions";
import EditTermsAndCondition from "../pages/EditTermsAndConditions";
import CreateNewCourse from "../pages/CreateNewCourse";
import Support from "../component/dashHome/Support";
import Mycourse from "../pages/mycourse";
import Earning from "../pages/Earning";
import Webiner from "../pages/Webiner";
import Totalusers from "../component/admin/manageUsers/Totalusers";
import Content from "../component/admin/Content";
import TransactionsStatus from "../component/Transactions/TransactionStatus";
import Recordings from "../component/student/Recordings";
import Mycourses from "../component/student/Mycourses";
import Recources from "../component/student/Recources";





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
                element: <DasboardHome />,
            },
            {
                path: "/notifications",
                element: <Notifications />,
            },
            {
                path: "/createnewcourse",
                element: <CreateNewCourse />,
            },
            {
                path: "/category_management",
                element: <Category_Management />,
            },
            {
                path: "/mycourse",
                element: <Mycourse/>,
            },
            
            {
                path: "/earning",
                element: <Earning />,
            },
            {
                path: "/webiner",
                element: <Webiner />,
            },


            // admin menu item --------------
            {
                path: "/usermanagement",
                element: <Totalusers />,
            },
            {
                path: "/content",
                element:<Content/>
            },
            {
                path: "/transactions",
                element: <TransactionsStatus />,
            },

            // student menu item ---------------
            {
                path: "/recordings",
                element:<Recordings/>
            },
            {
                path: "/mycourcess",
                element:<Mycourses/>
            },
            {
                path: "/resources",
                element:<Recources/>
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