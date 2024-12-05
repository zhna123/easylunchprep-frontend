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
import ProtectedRoute from "./ProtectedRoute";
import StepProtectedRoute from "./StepProtectedRoute";
import AddFood from "../components/FoodSelection/AddFood";
import AddSavedFood from "../components/Account/AddSavedFood";
import { BuildStepProvider } from "../contexts/BuildStepContext/BuildStepContext";
import { LunchboxProvider } from "../contexts/LunchboxContext/LunchboxContext";


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
          element: (
            <BuildStepProvider>
              <LunchboxProvider>
                <LunchboxBuilder />
              </LunchboxProvider>
            </BuildStepProvider>
          ),
        },
        {
          path: "select",
          element: (
            <BuildStepProvider>
              <LunchboxProvider>
                <StepProtectedRoute>
                  <SelectionLayout />
                </StepProtectedRoute>
              </LunchboxProvider>
            </BuildStepProvider>
          ),
          children: [
            {
              path: "fruits",
              element: <FoodSelection foodName="Fruits" />
            },
            {
              path: "fruits/add/:id?",
              element: (
                <ProtectedRoute>
                  <AddFood foodName="Fruits" />
                </ProtectedRoute>
              ) 
            },
            {
              path: "vegetables",
              element: <FoodSelection foodName="Vegetables" />
            },
            {
              path: "vegetables/add/:id?",
              element: (
                <ProtectedRoute>
                  <AddFood foodName="Vegetables" />
                </ProtectedRoute>
              )
            },
            {
              path: "protein",
              element: <FoodSelection foodName="Protein" />
            },
            {
              path: "protein/add/:id?",
              element: (
                <ProtectedRoute>
                  <AddFood foodName="Protein" />
                </ProtectedRoute>
              )
            },
            {
              path: "grain",
              element: <FoodSelection foodName="Grain" />
            },
            {
              path: "grain/add/:id?",
              element: (
                <ProtectedRoute>
                  <AddFood foodName="Grain" />
                </ProtectedRoute>
              )
            },
            {
              path: "dairy",
              element: <FoodSelection foodName="Dairy" />
            },
            {
              path: "dairy/add/:id?",
              element: (
                <ProtectedRoute>
                  <AddFood foodName="Dairy" />
                </ProtectedRoute>
              )
            },
          ]
        },
        {
          path: "account",
          element: (
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          ),
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
        },
        {
          path: "/account/add_food/:id?",
          element: <AddSavedFood foodName="Food" />
        },
      ]
    },
    
  ]);
  
  return <RouterProvider router={ router } />
}