import { Route, Routes } from "react-router-dom";
import ROUTES from "./routesModel";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";


const Router = () => {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.LOGIN} element={<Login/>} />
            <Route path={ROUTES.REGISTER} element={<Register/>} />
            <Route path={ROUTES.DEFAULT} element={<h1>404 Not Found</h1>} />
        </Routes>
    );
};

export default Router;