// Type con la informacion del usuario
export type User = {
    id: number;
    name: string,
    email: string;
    password: string;
    tasks: Task[];
}
// Type para la informacion mostrada del usuario
export type UserInfo = Pick<User, | 'id' | 'name' | 'email'>;

// Type para el login de usuarios
export type LoginData = Pick<User, 'email' | 'password'>

// Type para el registro de usuarios
export type RegisterData = {
    name: string;
    email: string;
    password: string;
}
// Type de las tareas que se van a mostrar
export type Task = {
    id: number;
    title: string;
    description: string;
    expirateDate: Date;
    state: string;
    userId: User['id']
}

// Type para el formulario de tareas
export type TaskFormData = Pick<Task, 'title' | 'description'> & {
    state?: React.OptionHTMLAttributes<HTMLOptionElement>['value'];
};

// Type para actualizar el estado de las tareas
export type TaskState = Pick<Task, 'state'>['state'];