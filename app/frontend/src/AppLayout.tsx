import { Outlet } from "react-router-dom"
import NavMenu from "./Components/NavMenu"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from "react-router-dom"


export default function AppLayout() {

    const navigate = useNavigate()

    return (
        <>
            <header className="bg-gray-800 py-5 p-6">
                <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">

                    <div
                        onClick={() => navigate('/')}
                        className="w-64 text-white hover:cursor-pointer text-center text-2xl font-bold py-2">
                        <img
                            className="text-white"
                            src='/logo.svg' alt="Logo in navbar" />
                    </div>
                    <NavMenu />
                </div>

            </header>
            <section className="
            
            max-w-screen-2xl mx-auto mt-10 p-5 min-h-screen">
                <Outlet />
            </section>

            <footer className="py-5 bottom-0 w-full">
                <p className="bg-gray-800 text-white text-center py-5">
                    Todos los derechos reservados {new Date().getFullYear()}. Leandro Martínez
                </p>
            </footer>
            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}