import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import { HomePage } from "../Pages/HomePage";
import { LoginPage } from "../Pages/LoginPage";
import { RegisterPage } from "../Pages/RegisterPage";
import { TaskPage } from "../Pages/TaskPage";

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas protegidas por Protected Route */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/tasks" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/task/:id" element={<TaskPage />} />
                </Route>
                <Route path="*" element={'No existe la página'} />
            </Routes>
        </BrowserRouter>
    )
}