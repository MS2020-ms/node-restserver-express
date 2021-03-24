const { OAuth2Client } = require('google-auth-library');

//CLIENT_ID desde mi .env
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleVerify = async (idToken = '') => {
    const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });

    const {
        name: nombre,
        picture: img,
        email: correo
    } = ticket.getPayload();

    return { nombre, img, correo };
}

module.exports = {
    googleVerify
}
