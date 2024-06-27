// Create a type for user data
export type User = {
    id: number;
    name: string,
    email: string;
    password: string;
    tasks: Task[];
}
// Create a type for login data
export type LoginData = Pick<User, 'email' | 'password'>

// Create a type for register data
export type RegisterData = {
    name: string;
    email: string;
    password: string;
}


// Type the Task referenciando a User y su ID
export type Task = {
    id: number;
    title: string;
    description: string;
    expirateDate: Date;
    state: string;
    userId: User['id']
}

export type TaskFormData = Pick<Task, 'title' | 'description'> & {
    state?: React.OptionHTMLAttributes<HTMLOptionElement>['value'];
};