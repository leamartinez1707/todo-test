// Create a type for user data
export type User = {
    id: number;
    name: string,
    email: string;
    password: string;
    tasks: Task[];
}


// Type the Task referenciando a User y su ID
export type Task = {
    id: number;
    title: string;
    description: string;
    userId: number;
    expirateDate: Date;
    state: string;
    user: User['id']
}