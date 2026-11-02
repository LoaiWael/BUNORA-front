import { createBrowserRouter, Navigate } from "react-router"
import App from "@/App"
import PredictPage from "@/pages/Predict"
import ModelsPage from "@/pages/Models"
import DatasetPage from "@/pages/Dataset"
import AboutPage from "@/pages/About"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <PredictPage />,
      },
      {
        path: "predict",
        element: <Navigate to="/" replace />,
      },
      {
        path: "models",
        element: <ModelsPage />,
      },
      {
        path: "dataset",
        element: <DatasetPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
])
