import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";




export const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/about",
                element: <About></About>,
            },
            {
                path: "/contact",
                element: <Contact></Contact>,
            }
            
        ]
    }
])