import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Gps_Info from "./pages/Gps_Info";
import Gps_Details from "./pages/Gps_Details";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./style.scss";

const router = createBrowserRouter([
    {
        path:"/",
        element: <div>
            <Navbar/>
            <Home />
            <Footer/>
         </div>,
    },
    {
        path:"/register",
        element: <Register/>,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/gps_info",
        element: <Gps_Info />,
    },
    {
        path: "/gps_details/:id",
        element: <Gps_Details />,
    },
    {
        path: "/logout",
        element: <Login />,
    }
])
function App() {
  return (
      <div className="App">
          <div className="container">
              <RouterProvider router={router} />
          </div>
    </div>
  );
}

export default App;
