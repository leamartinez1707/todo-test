import { useAuth } from "../hooks/useAuth"



export const ProfilePage = () => {

    const { user } = useAuth()

    return (
        <div>
            {user &&
                <div>
                    <h1>Perfil</h1>
                    <p>Nombre: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            }
        </div>
    )
}
