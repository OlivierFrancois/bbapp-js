import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css'
import ErrorPage from "./error-page";
import PlanningRepasPage from "./routes/PlanningRepasPage.tsx";
import Root from "./routes/Root.tsx";
import HomePage from "./routes/HomePage.tsx";
import dayjs from "dayjs";

dayjs.locale('fr');

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <HomePage/>
            },
            {
                path: "/planning-repas",
                element: <PlanningRepasPage/>
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
    ,
)
