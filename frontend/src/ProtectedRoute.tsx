import { Outlet } from "react-router-dom"
import NavMenu from "./Components/NavMenu"



export default function ProtectedRoute() {

    return (
        <>
            <header className="bg-gray-800 py-5">
                <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">

                    <div className="w-64 text-white text-center text-2xl font-bold py-2">ToDo App Logo</div>
                    <NavMenu />
                </div>

            </header>
            <section className="max-w-screen-2xl mx-auto mt-10 p-5">
                <Outlet />
            </section>

            <footer className="py-5 absolute bottom-0 w-full">
                <p className="bg-gray-800 text-white text-center py-5">
                    Todos los derechos reservados {new Date().getFullYear()}. Leandro Martínez ToDo App
                </p>
            </footer>

        </>
    )
}