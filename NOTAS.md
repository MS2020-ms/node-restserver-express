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
## Devolver el N?? de usuarios en BD
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
- >heroku config:set MONGODB_CNN="copiar de .env"

# Autenticacion por Token
- JWT jsonwebtoken = Header-Payload(data)-Firma
- https://jwt.io/
- Parse - JWT - Obtener Payload y fecha de creaci??n y expiraci??n
  C??digo para leer JWT -> consola de navegador:

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
- >heroku config
- >heroku config:set SECRETORPRIVATEKEY="copiar de .env"
- >heroku config
- >git add .
- >git commit -m "JWT implementado"
- >git push heroku main or >git push

# GOOGLE SIGN-IN
## Generar APIKey y APISecret
- https://developers.google.com/identity/sign-in/web/sign-in
  Go to the Credentials page
  Credenciales
  + Crear Credenciales
  ID de cliente de OAuth
  Tipo de aplicacion: Aplicacion web
  Nombre: Node-Cafe
  Agregar URI -> http://localhost:8080
  Agregar URI -> https://restserver-udemy-node.herokuapp.com
  CREAR
  TU ID de cliente: ver .env
  Tu secreto de cliente: ver .env
## Usuario de Google - Frontend
- ir public/index.html
## Rutas para manejat autenticacion de Google
- https://developers.google.com/identity/sign-in/web/sign-in
  Authenticate with a Backend Server
  Send the ID token to your server
- ir public/index.html
- crear ruta que reciba id-token -> 
  ir routes/auth.js
- crear controlador controllers/auth.js
- Probar ruta en Postman 
## Validar Token de Google en Backend
- https://developers.google.com/identity/sign-in/web/sign-in
  Verify the integrity of the ID token
  Using a Google API Client Library
  Node.js
  >npm install google-auth-library --save
  copiar codigo verofyToken()
- crear helpers/google-verify.js
  pegar codigo y adaptarlo
- ir controllers/auth.js
- ir models/usuario.js
## Crear usuario personalizado con credenciales de Google en BD
- ir controllers/auth.js

# Variables de entorno .env personalizadas GOOGLE_CLIENT_ID -> Deploy Heroku
- >heroku config
- >heroku config:set GOOGLE_CLIENT_ID="copiar de .env"
- >heroku config
- >git add .
- >git commit -m "Google-In implementado"
- >git push heroku main or >git push

# Generar 'documentacion' automatica de nuestras rutas - Postman
- Postman
- Collections/Cafe-Node .../View Documentation/ Language JavaScript Fetch -> Publish (arriba drch)
- Abre un pagina en navegador -> personalizar y Publish Collection
  URL
  https://documenter.getpostman.com/view/14330308/TzCHA9j8

# CRUD y Rutas de Categorias
- crear routes/categorias.js
- crear controllers/categorias.js
- ir models/server.js
- crear rutas en Postman
## Modelo Categoria
- crear models/categoria.js
- crear models/index.js -> xa agrupar importacion de modelos
## CRUD de Categorias
- ir routes/categorias.js
- ir controllers/categorias.js
- ir helpers/db.validators.js -> existeCategoria
- ir Postman (peticiones)

# Modelo de Productos y Rutas
- crear routes/productos.js
- crear controllers/productos.js
- crear models/producto.js
- ir models/server.js -> crear path y route de productos
## CRUD de Productos
- ir routes/productos.js
- ir controllers/productos.js
- ir helpers/db.validators.js -> existeProducto
- ir Postman (peticiones)

# Ruta para realizar Busquedas en BD
- crear routes/buscar.js
- crear controllers/buscar.js
- ir models/server.js
- ir Postman (peticiones)

# Deploy Heroku
- >git add .
  >git commit -m "CRUD Productos, categorias y busquedas"
  >git brunch (compruebo el nombre de mi rama = main)
  >git push heroku main or >git push
- Postman enviroment: Produccion-Node y hacer peticiones contra Heroku

# Cargas de Archivos
- crear routes/uploads.js
- crear controllers/uploads.js
- ir models/server.js
## Subir archivos - express-fileupload
- https://www.npmjs.com/package/express-fileupload
- >npm i express-fileupload
- ir models/server.js -> ir a los middlewares
- ir Postman - Body - (o)form-data - key:archivo[file] value[select file] - Send
- ir controllers/upload.js
  pegar desde https://github.com/richardgirges/express-fileupload/blob/master/example/server.js
  el interior de app.post('/upload', function(req, res) {...}
  pegar en cargarArchivo
- creo carpeta uploads (donde guardar archivos)
## Validar extensiones
- ir controllers/uploads.js
## Ubicar y cambiar nombre
- >npm i uuid
- ir controllers/uploads.js
## Helper - SubirArchivo
- crear helpers/subir-archivo.js
- ir controllers/uploads.js
## Crear carpetas de destino
- ir controllers/uploads.js

# Rutas para actualizar imagenes de usuarios y productos
- crear ruta actualizar archivos en Postman
- ir routes/uploads.js
- ir controllers/uploads.js
- ir helpers/db-validators.js -> coleccionesPermitidas
## Actualizar imagen de usuario y productos
- ir controllers/uploads.js
- crear middlewares/validar-archivo.js
## Borrar archivos del servidor
- ir controllers/uploads.js
## Servicio para mostrar imagenes
- crear ruta
- ir routes/uploads.js
- ir controllers/uploads.js
## Imagen de relleno Placeholder
- ir controllers/uploads.js
 
# Heroku.....NO almacena archivos de imagenes
# Cloudinary SI (1Gb gratis xa imagenes) - Servidor para imagenes y videos
- https://www.npmjs.com/package/cloudinary
- https://cloudinary.com/
- >npm install cloudinary
- copiar CLOUDINARY_URL= en .env
- ir controllers/uploads.js -> actualizarImagenCloudinary
- ir routes/uploads.js
## Borrar imagenes de Cloudinary
- ir controllers/uploads.js

# Deploy Heroku
- Variable de entorno a Heroku:
  >heroku config 
  >heroku config:set CLOUDINARY_URL="copiar de .env"
  >heroku config
- >git add .
  >git commit -m "file upload added"
  >git brunch (compruebo el nombre de mi rama = main)
  >git push heroku main or >git push
- Postman enviroment: Produccion-Node y hacer peticiones contra Heroku