import { Route, Routes } from "react-router-dom";
import ROUTES from "./routesModel";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import App from "../App";

const Router = () => {
    return (
        <Routes>
            <Route path={'/'} element={<App />}>
                <Route index={true} path={ROUTES.HOME} element={<HomePage />} />
                <Route path={ROUTES.LOGIN} element={<LoginPage/>} />
                <Route path={ROUTES.REGISTER} element={<RegisterPage/>} />
            </Route>
            <Route path={ROUTES.DEFAULT} element={<h1>404 Not Found</h1>} />
        </Routes>
    );
};

export default Router;