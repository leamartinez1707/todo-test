import { Menu, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { Link } from "react-router-dom"
import { Fragment } from "react/jsx-runtime"
import { Task } from "../../types/types"
import { updateState } from "../../api/tasks"
import { toast } from "react-toastify"


type OptionsProps = {
    task: Task
    setTaskUpdated: React.Dispatch<React.SetStateAction<boolean>>
}

export const Options = ({ task, setTaskUpdated }: OptionsProps) => {

    const handleComplete = async (id: number) => {
        const response = await updateState(id);
        if (typeof response === 'string') return toast.error('No se pudo actualizar la tarea')
        toast.success('Tarea actualizada')
        setTaskUpdated(true)
        setTimeout(() => {
            setTaskUpdated(false)
        }, 500);
    }


    return (
        <Menu as="div" className="relative flex-none">
            <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                <span className="sr-only">opciones</span>
                <EllipsisVerticalIcon className="size-6" aria-hidden="true" />
            </Menu.Button>
            <Transition as={Fragment} enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95">
                <Menu.Items
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                >
                    <Menu.Item>
                        <button onClick={() => handleComplete(task.id)}
                            className='flex w-full px-3 py-1 text-sm leading-6 text-gray-900 duration-300 transition-colors hover:bg-green-200'>
                            {task.state === 'completada' ? 'Volver a pendientes' : 'Completada'}
                            <svg
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-1 size-4 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>

                        </button>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to={``}
                            className='flex px-3 py-1 text-sm leading-6 text-gray-900 duration-300 transition-colors hover:bg-yellow-200'>
                            Editar
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-1 size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>

                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <button
                            type='button'
                            className='flex w-full px-3 py-1 text-sm leading-6  duration-300 transition-colors hover:bg-red-200'
                            onClick={() => { }}
                        >
                            Eliminar
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-1 size-4 text-red-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>

                        </button>
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
