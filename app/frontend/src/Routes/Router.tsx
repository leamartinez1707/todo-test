import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import { HomePage } from "../Pages/HomePage";
import { LoginPage } from "../Pages/LoginPage";
import { RegisterPage } from "../Pages/RegisterPage";
import { TaskPage } from "../Pages/TaskPage";
import { ProfilePage } from "../Pages/ProfilePage";

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas protegidas por Protected Route */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/tasks" element={<HomePage />} />
                    <Route path="/task/create" element={<TaskPage />} />
                    <Route path="/task/update/:id" element={<TaskPage />} />
                </Route>
                <Route path="*" element={'No existe la página'} />
            </Routes>
        </BrowserRouter>
    )
}