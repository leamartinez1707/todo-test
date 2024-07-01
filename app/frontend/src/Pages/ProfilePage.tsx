import { useEffect, useState } from "react"
import { getProfile } from "../api/auth"
import { User } from "../types/types"


export const ProfilePage = () => {
    const [user, setUser] = useState<Pick<User, 'id' | 'email' | 'name'>>()

    useEffect(() => {

        const getUser = async () => {
            const userFound = await getProfile()
            setUser(userFound)
        }
        getUser()
    }, [])

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
