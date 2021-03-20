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
- con Github -> deploy Branch