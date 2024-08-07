
# **To Do App | React & Nestjs**

## Arquitectura

El proyecto sigue una arquitectura moderna basada en Cliente-servidor, utilizando NestJS para el backend, MySQL como base de datos y React para el frontend, proporcionando una separación clara de responsabilidades y una escalabilidad eficiente.

Backend: Con NestJS y siguiendo el patrón de diseño MVC, utilizamos TypeScript para asegurar la tipificación de datos y la estructura del código. Utilizamos MySQL como sistema de gestión de base de datos para almacenar de manera persistente las tareas y otros datos relevantes de la aplicación, contectandolo con NestJS mediante Prisma ORM.

Frontend: Se utilizó React y Tailwind para crear una interfaz de usuario dinámica e interactiva. La interfaz permite a los usuarios ver, agregar, actualizar, marcar como completadas y eliminar tareas de su lista. Se utiliza Context para la gestión del estado de la aplicación y Axios para manejar lógicas asíncronas, como la comunicación con el backend.

Middleware de Autorización y autenticación: Este servicio verificará las credenciales del usuario (como email y contraseña) y generará un token JWT válido si las credenciales son correctas.
Se utilizó un middleware de NestJS para validar y decodificar el token JWT enviado en las solicitudes protegidas. Este middleware verificará la validez del token y permitirá o denegará el acceso a recursos protegidos basados en los roles o permisos del usuario.

## Instrucciones para _ejecutar la aplicación_.

Primero que nada, debemos clonar el proyecto, utilizando nuestro IDE. (Recomiendo Visual Studio)

  #### En la carpeta donde queremos clonarlo, en la terminal de visual studio ejecutamos:
  ```bash
  git clone https://github.com/leamartinez1707/todo-test.git
  ```

  Luego ingresamos a la carpeta que se creo, se puede ingresa con:
  ```
  cd todo-test
  ```

Primero instalamos todos los paquetes de la aplicación con:
```bash
npm install
```
Luego debemos vamos a crear un archivo **_.env_** donde definiremos nuestras variables de entorno. Este archivo se crea en la carpeta app/backend
```
cd app/backend
```
Para poder conectarse a un servidor de MySql, debemos de tenerlo instalado en nuestra computadora.
Una vez instalado y configurado, y ya con nuestras credenciales para poder crear un servidor, en nuestro archivo .env , crearemos dos variables, estas son;
```
DATABASE_URL="mysql://{tunombredeusuario}:{tucontraseña}@localhost:3306/db-todoapp"
JWT_SECRET='cualquiertexto'
```
  En las secciones con {}, debemos poner el usuario y contraseña de nuestro MySql.
  (Las {} no van, solo texto)

Una vez creada estas variables e instalados todos los paquetes de la App, ejecutamos el siguiente comando en consola, dentro de la carpeta app/backend donde ya estamos ubicados:
```bash      
npx prisma migrate dev --name init        // Esto crea el schema en nuestra base de datos MySql
```

### Luego de tener todo instalado, volvemos a la carpeta raíz
```
cd ..
cd ..
```
#### Dentro de esta, ejecutamos los comandos para ejecutar la App en modo desarrollo
```
npm run dev
```
Luego de ejecutado el comando, gracias a TurboRepo, se ejecutaran tanto el backend como el frontend, y se podran utilizar desde una misma url.

#### En entorno de desarrollo se debe ingresar a http://localhost:5173/

En caso de querer correr el proyecto en modo producción, debemos hacer un build de la aplicación y luego ejecutarla.
```bash
  npm build
  npm start
```
#### En entorno de producción se debe ingresar a http://localhost:3000/

## Instrucciones para testing _.

En este caso se aplicó en el backend, testeando cada endpoint de la API.
Para ejecutar los testing aplicados, debejemos ejecutar el comando:

```bash
  npm run test
```

## Decisiónes técnicas más importantes

### Backend

**Seguridad:** Se utilizó JWT Service de NestJs para manejar la autenticación entre el frontend y el backend.
**ServeStaticModule:** Módulo de NestJs que facilita el servicio de archivos estáticos desde el servidor, en este caso nos permite ejecutar el backend y frontend en una sola url.
**Testing:** Se realizaron tests a todos los endpoint de la aplicación para verificar que la respuesta sea la correcta y validar toda la información.

### Frontend

**Estado global:** Se utilizó Context para manejar los estados globales, tanto para el sistema de autenticación como para la gestión de tareas.
**Gestión de rutas:** Utilización de React Router para la navegación entre las diferentes vistas de la aplicación, como la lista de tareas, la página de detalles de una tarea y el perfil del usuario.
**Componentes:** Se crearon componentes reutilizables para obtener un código limpio y fácil de mantener.
**Manejo de errores:** Se utilizó React Hook Form para el manejo de errores en formularios.
**Vite Proxy:** Configuración para poder especificar la URL del backend y poder redirigir las peticiones, permite simular entornos de producción y facilita el desarrollo al manejar automáticamente las políticas de CORS que podrían bloquear las solicitudes entre dominios durante el desarrollo local.

### Aplicación

Creación de un MonoRepo para unificar el Backend y el Frontend, tener el código de ambos proyectos en un solo repositorio para ejecutarlos simultaneamente.

**Turbo Repo:** Proporciona herramientas y técnicas para optimizar el flujo de trabajo, simplifica el proceso de configuración de monorepos, pudiendo utilizar Scripts para ejecutar ambos proyectos a la vez a la hora de desarrollo o producción.


## Soporte

En caso de precisar ayuda para ejecutar el código, o cualquier tipo de problema, comunicarse al mail leandromartinez.dev@gmail.com o en mi [Linkedin](https://www.linkedin.com/in/leandromartinezuy)

