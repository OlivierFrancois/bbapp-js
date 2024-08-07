import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css'
import ErrorPage from "./error-page";
import DishSchedulePage from "./routes/DishSchedulePage.tsx";
import Root from "./routes/Root.tsx";
import HomePage from "./routes/HomePage.tsx";
import dayjs from "dayjs";
import weekOfYear from 'dayjs/plugin/weekOfYear';
import DishPage from "./routes/DishPage.tsx";
import ArticlePage from "./routes/ArticlePage.tsx";

dayjs.locale('fr');
dayjs.extend(weekOfYear);

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
                path: "/dish-schedule",
                element: <DishSchedulePage/>
            },
            {
                path: "/dish",
                element: <DishPage/>
            },
            {
                path: "/article",
                element: <ArticlePage/>
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
