import { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, BarsArrowUpIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'react-toastify'

export default function NavMenu() {

    const [pop, setPop] = useState(false)
    const handlePop = () => setPop(!pop)

    const { user, logout } = useAuth()


    return (
        <Popover className="relative">
            <Popover.Button
                onClick={handlePop}
                className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-red-400">
                {pop ? <BarsArrowUpIcon className='w-8 h-8 text-white' /> : <Bars3Icon className='w-8 h-8 text-white ' />}
            </Popover.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48">
                    <div className="w-full lg:w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                        <p className='text-center'>Hola: <span className='uppercase'>{user?.name}</span></p>
                        <Link
                            to='/profile'
                            className='block p-2 hover:text-purple-950'
                        >Mi perfil</Link>
                        <Link
                            to='/tasks'
                            className='block p-2 hover:text-purple-950'
                        >Mis tareas</Link>
                        <button
                            className='block p-2 hover:text-red-500 '
                            type='button'
                            onClick={async () => {
                                logout()
                                toast.success('Sesión cerrada') 
                            }}
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover >
    )
}