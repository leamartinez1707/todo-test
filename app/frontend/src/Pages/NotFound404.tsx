import { useNavigate } from "react-router-dom"

export const NotFound404 = () => {

    const navigate = useNavigate()
    return (
        <div className="border-solid border-b-4 flex flex-col items-center">
            <h1 className="text-2xl font-black text-center py-6">
                La página que buscas no existe o no tienes acceso.
            </h1>
            <button
                onClick={() => navigate('/tasks')}
                className="bg-blue-500 my-4 hover:bg-blue-700 text-white font-bold py-2 px-4 w-1/2 rounded-full"
            >
                Volver al inicio
            </button>
        </div >
    )
}
