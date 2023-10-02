import { Route, Routes } from "react-router-dom";
import ROUTES from "./routesModel";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";


const Router = () => {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage/>} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage/>} />
            <Route path={ROUTES.DEFAULT} element={<h1>404 Not Found</h1>} />
        </Routes>
    );
};

export default Router;