# Inicio
- >npm init -y
- >npm i express
- >npm i dotenv
- crear app.js
- crear .env

## Express basado en clases
- crear models/server.js
- crear public/index.html
## Peticiones http (GET-POST-PUT-DELETE)
- ir app.js
## CORS - Midlewares
- Proteger el servidor, habilitar el cors para los navegadores y que todos puedan acceder a mi app
- >npm i cors
- ir server.js
## Separa rutas y el controlador de la clase
- Separar rutas:
- crear routes/usuarios.js
- ir server.js
- Separa controlador:
- crear controllers/usuario.js
- ir usuarios.js
## Obtener datos de un Post
## Parametros de segmento y query

# Subir aplicacion a Heroku
- IMPORTATE: package.json -> script: "start": "node app"
- ir heroku.com
- create new app
- Deploy
- con Github -> deploy Branch
- https://restserver-udemy-node.herokuapp.com/

# Base de datos en MongoDB (cluster) - Mongo Atlas
- crear cluster ver => video 117
- ir .env
- abrir mongoDB Compass, pego MONGODB_CNN -> connect

# Conectarse con BD (Mongo) - Mongoose
- https://mongoosejs.com/docs/index.html
- >npm install mongoose
- crear database/config.js

## Modelo de Usuario
- crear models/usuario.js
## Creando un usuario en la coleccion (POST)
- ir controllers/usuario.js
- ir POSTMAN -> POST localhost:8080/api/usuarios
  Body | raw | JSON:
  {
   "nombre": "test1 ",
   "google": true,
   "correo": "test1@gmail.com",
   "password": "12345",
   "rol": "USER_ROLE"
  }
  Send
## BcryptJS - encriptar contrasena
- >npm i bcryptjs
- ir controllers/usuario.js
- de nuevo peticion POST (Postman)
## Validar campos obligatorios - Email
- >npm i express-validator
- ir routes/usuario.js
- ir controllers/usuario.js
## Validar todos los campos obligatorios
- ir routes/usuario.js
- crear midleware personalizado para manejar el validador
  crear midlewares/validar-campos.js
## Validar rol contra la base de datos
- Definir los roles desde la base de datos
- Ir Mongocompass en cafeDB - new Collection ('roles')
  Add Data - Insert Document:
  {
      "rol": "ADMIN_ROLE"
  }
  Add Data - Insert Document:
  {
      "rol": "USER_ROLE"
  }
  Add Data - Insert Document:
  {
      "rol": "VENTAS_ROLE"
  }
- crear models/role.js
- ir routes/usuario.js
## Custom validacion - esRolValido (helpers)
- CENTRALIZAR la validacion del rol (optimizar codigo):
  crear helpers/db-validators
  ir routes/usuario.js -> esRolValido
## Sacar el "pasword" y __v de la respuesta (res) - informacion sensible
- ir models/usuario.js
## Custom validacion - EmailExiste (helpers)
- ir helpers/db-validators
- ir routes/usuario.js -> emailExiste

# Actualizar info del usuario (PUT)
- crear nueva peticion PUT en Postman
- ir controllers/usuario.js
## Validaciones en el PUT
- ir routes/usuarios.js
- crear validador personalizado
  ir helpers/db-validators
# Obtener usuarios de forma paginada (GET)
- ir controllers/usuario.js
## Devolver el N° de usuarios en BD
- ir controllers/usuario.js

# Delete borrar un usuario de BD (DELETE)
- ir controllers/usuario.js

# Desplegar RestServer en Heroku
- guardar todos los cambios en git
- deploy to heroku

# Variables de entorno .env personalizadas Heroku
- NO SUBIR .env a un repositorio
- ir .gitignore
- >git rm .env --cached -> (rm de remove)
  >git add .
  >git commit -m ".env borrado"
- duplicar .env y renombrar .example.env
- borrar MONGODB_CNN del .example.env
- >git add .
  >git commit -m ".example.env added"
  >git push

- Creo variable de entorno en heroku:
- >heroku config:set MONGODB_CNN="mongodb+srv://user_node_cafe:yObCd5PoFsP3hgtm@miclustercafe.doasz.mongodb.net/cafeDB"

# Autenticacion por Token
- JWT jsonwebtoken = Header-Payload(data)-Firma
- https://jwt.io/
- Parse - JWT - Obtener Payload y fecha de creación y expiración
  Código para leer JWT -> consola de navegador:

  ```
  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };
  ```
  ```
  let token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1pZ3VlbCBTb3RvIiwiaWF0IjoxNTE2MjM5MDIyfQ.puPLJV7qHwalYSD-HyTYt5AjRCVAFiWkFcvBXqn1ep4
  ```
  ```
  parseJwt (token)
  ```

# Crear ruta autenticacion - Auth - Login
- ir models/server.js
- crear routes/auth.js
- crear controllers/auth.js
## Login de usuario y generar JWT
- >npm i jsonwebtoken
- ir controllers/auth.js
- crear helpers/generar-jwt.js
- ir .env (SECRETORPRIVATEKEY)
## Cambiar _id por uid 
- ir models/usuario.js
## Proteger rutas mediante Token-Middleware
- crear nuevo midleware personalizado
  ir midlewares/validar-jwt.js
  Postman -> Headers: x-token: abc123
- ir routes/usuarios.js -> validarJWT
- ir controllers/usuario.js
## Obtener informacion del usuario autenticado
- 1.datos del usuarioAutenticado 
- ir controllers/usuario.js
- ir midlewares/validar-jwt.js
- 2.comprobar que el usuario tiene estado true (activo)
## Middleware verificar ROL de Adminsitrador
- crear nuevo midlewares/validar-roles.js
- ir  routes/usuarios.js -> esAdminRole
## Middleware tiene ROL
- Esta ruta la puede ejecutar teniendo varios roles
- ir midlewares/validar-roles.js
- ir routes/usuarios.js -> tieneRole
## Optimizar importaciones en Node
- crear middlewares/index.js
- ir routes/usuarios.js

# Variables de entorno .env personalizadas SECRETORPRIVATEKEY -> Deploy Heroku