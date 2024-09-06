import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import { Home } from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import Search from "../pages/Search/Search";

import { DashboardLayout } from "../Dashboard/DashboardLayout";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Login from "../pages/Login";
import SignleBook from "../pages/shared/SignleBook";
import Buy from "../pages/shared/Buy";
import UploadBook from "../Dashboard/UploadBook";
import Dashboard from "../Dashboard/Dashboard";
import ManageBooks from "../Dashboard/ManageBooks";
import EditBooks from "../Dashboard/EditBooks";
import Signup from "../pages/Signup";
import Logout from "../pages/Logout";
import ErrorPage from "../pages/shared/ErrorPage";
import About from "../pages/about/About";
import Blog from "../pages/blog/Blog";

import MainAdmin from "../Admin/MainAdmin";
import AdminManageBooks from "../Admin/ManageBooks";

import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";

import OrderedList from "../pages/OrderedList/OrderedList";
import AllOrderedList from "../pages/OrderedList/AllOrderList";
import Mystery from "../Category/Mystery";
import Programming from "../Category/Programming"
import ScienceFiction from "../Category/ScienceFiction"
import Fantasy from "../Category/Fantasy"
import Horror from "../Category/Horror"
import Biography from "../Category/Biography"
import Autobiography from "../Category/Autobiography"
import History from "../Category/History"
import SelfHelp from "../Category/SelfHelp"
import Business from "../Category/Business";
import Category1 from "../Category/Category-1";
import Fiction from "../Category/Fiction";

import NonFiction from "../Category/NonFiction";

import Cart from "../Cart/Cart";
import PasswordReset from "../pages/PasswordReset";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Home />
      },

      {
        path: "/shop",
        element: <Shop />,
      },

      {
        path: "/search",
        element: <Search/>,
      },
     


      {
        path: "/book/:id",
        element: <SignleBook />,
        loader: ({ params }) => fetch(`http://localhost:5000/book/${params.id}`)
      },

      {
        path: "/buy/:id",
        element: <Buy/>,
        loader: ({ params }) => fetch(`http://localhost:5000/book/${params.id}`)
      },

      {
        path: "/payment-success",
        element: <PaymentSuccess/>,
       
      },

      {
        path: "/order-list",
        element: <OrderedList/>,
       
      },

      {
        path: "/all-order-list",
        element: <AllOrderedList/>,
       
      },

      {
        path: "/main-admin",
        element: <MainAdmin/>,
       
      },

      {
        path: "/admin-manage-books",
        element: <AdminManageBooks/>,
       
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/blog",
        element: <Blog/>
      },
      // {
      //   path: "category/category-1",
      //   element: < Category1/>
      // },
      {
        path: "category/fiction",
        element: < Fiction/>
      },
      {
        path: "category/non-fiction",
        element: < NonFiction/>
      },
      {
        path: "category/mystery",
        element: < Mystery/>
      },
      {
        path: "category/programming",
        element: < Programming/>
      },
      {
        path: "category/science-fiction",
        element: < ScienceFiction/>
      },
      {
        path: "category/fantasy",
        element: < Fantasy/>
      },
      {
        path: "category/horror",
        element: < Horror/>
      },
      {
        path: "category/biography",
        element: < Biography/>
      },
      {
        path: "category/autobiography",
        element: < Autobiography/>
      },
      {
        path: "category/history",
        element: <  History/>
      },
      {
        path: "category/self-help",
        element: < SelfHelp/>
      }
      ,
      {
        path: "category/business",
        element: < Business/>
      },
      {
        path: "/cart",
        element: < Cart/>
      },
      {
        path: "/reset-password",
        element: < PasswordReset/>
      },


    ]
  },


  {
    path: "/admin/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "/admin/dashboard", element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>},
      { path: "/admin/dashboard/upload", element: <UploadBook /> },
      { path: "/admin/dashboard/manage", element: <ManageBooks /> },
      { path: "/admin/dashboard/edit-books/:id", element: <EditBooks />,
      loader: ({ params }) => fetch(`http://localhost:5000/book/${params.id}`)
    },
    ],
  },

  
  {
    path: "login",
    element: <Login />
  },
  {
    path: "/create-user",
    element: <Signup/>
  },
  {
    path:"/logout",
    element: <Logout/>
  }
]);

export default router;