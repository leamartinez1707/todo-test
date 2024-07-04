
# **To Do App | React & Nestjs**

## Bienvenidos a la mejor aplicación para controlar tus tareas diarias.
Recordá que para conseguir tus logros, se necesita tomar acción diariamente, por eso con To Do App, podes crear, leer, actualizar y borrar todas tus tareas, para organizar tu día y completar todos tus objetivos.


## Arquitectura

El proyecto sigue una arquitectura moderna basada en Cliente-servidor, utilizando NestJS para el backend, MySQL como base de datos y React para el frontend, proporcionando una separación clara de responsabilidades y una escalabilidad eficiente.

Backend: Con NestJS y siguiendo el patrón de diseño MVC, utilizamos TypeScript para asegurar la tipificación de datos y la estructura del código. Utilizamos MySQL como sistema de gestión de base de datos para almacenar de manera persistente las tareas y otros datos relevantes de la aplicación, contectandolo con NestJS mediante Prisma ORM.

Frontend: Se utilizó React y Tailwind para crear una interfaz de usuario dinámica e interactiva. La interfaz permite a los usuarios ver, agregar, actualizar, marcar como completadas y eliminar tareas de su lista. Se utiliza Context para la gestión del estado de la aplicación y Axios para manejar lógicas asíncronas, como la comunicación con el backend.

Middleware de Autorización y autenticación: Este servicio verificará las credenciales del usuario (como email y contraseña) y generará un token JWT válido si las credenciales son correctas.
Se utilizó un middleware de NestJS para validar y decodificar el token JWT enviado en las solicitudes protegidas. Este middleware verificará la validez del token y permitirá o denegará el acceso a recursos protegidos basados en los roles o permisos del usuario.

# Instrucciones para _ejecutar la aplicación_ en cualquier navegador.


En la carpeta raíz del proyecto, abrir la terminal de Visual Studio Code y ejecutar los siguientes comandos: 
```bash
  npm install
  npm run dev
```

Luego de ejecutado el comando, gracias a TurboRepo, se ejecutaran tanto el backend como el frontend, y se podran utilizar desde una misma url.

#### En entorno de desarrollo se debe ingresar a http://localhost:5173/

En caso de querer correr el proyecto en modo producción, primero debemos instalar los paquetes, hacer un build de la aplicación y luego ejecutarla.
```bash
  npm install
  npm build
  npm run dev
```
#### En entorno de producción se debe ingresar a http://localhost:3000/


    
## Soporte

En caso de precisar ayuda para ejecutar el código, o cualquier tipo de problema, comunicarse a mi gmail leandromartinez.dev@gmail.com o en mi [Linkedin](https://www.linkedin.com/in/leandromartinezuy)

