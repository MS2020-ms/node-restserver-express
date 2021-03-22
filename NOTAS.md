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

