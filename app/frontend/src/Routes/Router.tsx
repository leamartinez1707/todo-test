import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../AppLayout";
import { HomePage } from "../Pages/HomePage";
import { LoginPage } from "../Pages/LoginPage";
import { RegisterPage } from "../Pages/RegisterPage";
import { TaskPage } from "../Pages/TaskPage";
import { ProfilePage } from "../Pages/ProfilePage";
import { ProtectedRoutes } from "../ProtectedRoutes";
import { NotFound404 } from "../Pages/NotFound404";

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas encapsuladas por App Layout */}
                {/* AppLayout contiene el Navbar y el footer para que siempre sean mostrados */}
                <Route element={<AppLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    {/* Con el componente de ProtectedRoutes, verificamos que el usuario este identificado para ingresar a las rutas encapsuladas */}
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/" element={<HomePage />} />
                        <Route path="/tasks" element={<HomePage />} />
                        <Route path="/task/update/:id" element={<TaskPage />} />
                        <Route path="/task/create" element={<TaskPage />} />
                    </Route>
                    {/* Si la ruta buscada no se encuentra, mostramos la pagina de error */}
                    <Route path="*" element={<NotFound404 />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}