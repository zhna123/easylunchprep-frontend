import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import RootLayout from "./RootLayout";
import Home from "../components/Home/Home";
import LogIn from "../components/Login/Login";
import Register from "../components/Login/Register";
import Account from "../components/Account/Account";
import SavedFood from "../components/Account/SavedFood";
import Lunchboxes from "../components/Account/Lunchboxes";
import DietaryPref from "../components/Account/DietaryPref";
import Settings from "../components/Account/Settings";
import LunchboxBuilder from "../components/Builder/LunchboxBuilder";
import FoodSelection from "../components/FoodSelection/FoodSelection";
import SelectionLayout from "../components/FoodSelection/SelectionLayout";
import FoodDetail from "../components/FoodDetail/FoodDetail";


export default function Router() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "login",
          element: <LogIn />
        },
        {
          path: "register",
          element: <Register />
        },
        {
          path: "build",
          element: <LunchboxBuilder />,
        },
        {
          path: "select",
          element: <SelectionLayout />,
          children: [
            {
              path: "fruits",
              element: <FoodSelection foodName="Fruits" />
            },
            {
              path: "fruits/add",
              element: <FoodDetail foodName="Fruits" />
            },
            {
              path: "vegetables",
              element: <FoodSelection foodName="Vegetables" />
            },
            {
              path: "vegetables/add",
              element: <FoodDetail foodName="Vegetables" />
            },
            {
              path: "protein",
              element: <FoodSelection foodName="Protein" />
            },
            {
              path: "protein/add",
              element: <FoodDetail foodName="Protein" />
            },
            {
              path: "grain",
              element: <FoodSelection foodName="Grain" />
            },
            {
              path: "grain/add",
              element: <FoodDetail foodName="Grain" />
            },
            {
              path: "dairy",
              element: <FoodSelection foodName="Dairy" />
            },
            {
              path: "dairy/add",
              element: <FoodDetail foodName="Dairy" />
            },
          ]
        },
        {
          path: "account",
          element: <Account />,
          children: [
            {
              index: true,
              element: <Lunchboxes />
            },
            {
              path: "food",
              element: <SavedFood />
            },
            {
              path: "dietary",
              element: <DietaryPref />
            },
            {
              path: "settings",
              element: <Settings />
            }
          ]
        }
      ]
    },
    
  ]);
  
  return <RouterProvider router={ router } />
}