import { useAuth } from "../hooks/useAuth"
import { useTasks } from "../hooks/useTasks"
import { useNavigate } from "react-router-dom"



export const ProfilePage = () => {

    const { user } = useAuth()
    const { tasks } = useTasks()

    const navigate = useNavigate()
    return (
        <div>
            {user &&


                <div className="text-sm leading-6">
                    <h1 className="text-center font-black text-4xl my-2 p-4">Mi perfil</h1>
                    <figure className="relative flex flex-col-reverse bg-slate-100 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5">
                        <figcaption className="flex items-center space-x-4">
                            <div className="flex-auto">
                                <div className="text-2xl text-slate-900 font-semibold dark:text-slate-200">
                                    {user?.name}
                                </div>
                                <div className="text xl mt-0.5 dark:text-slate-300">
                                    {user?.email}
                                </div>
                                <div>
                                    <span className="text-lg font-semibold text-slate-900 dark:text-slate-200">Tareas pendientes:</span> {tasks.filter(task => task.state === 'pendiente').length}
                                </div>
                                <div>
                                    <span className="text-lg font-semibold text-slate-900 dark:text-slate-200">Tareas completadas:</span> {tasks.filter(task => task.state === 'completada').length}
                                </div>
                            </div>
                            <div>
                                <button
                                    className="bg-red-400 hover:bg-red-600 p-2 rounded-md font-extrabold hover:font-black"
                                    onClick={() => navigate('/tasks')}
                                >Volver a mis tareas</button>
                            </div>
                        </figcaption>
                    </figure>

                </div>
            }
        </div>
    )
}
