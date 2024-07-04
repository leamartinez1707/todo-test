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
            
            max-w-screen-2xl mx-auto mt-10 p-1 sm:p-5 min-h-screen">
                <Outlet />
            </section>

            <footer className="w-full bg-gray-800 text-white text-center">
                <div className="bg-gray-800 text-white text-center p-4 sm:p-5">
                    <p>Contacto: leandromartinez.dev@gmail.com</p>
                    <p className="">
                        Todos los derechos reservados {new Date().getFullYear()}. Leandro Martínez
                    </p>
                </div>


            </footer>
            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}