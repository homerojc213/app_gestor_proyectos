import jwt from "jsonwebtoken"; 


const secret = "mi-llave-secreta"; //esto debería ir en variable de entorno

export const generarJWT = (uid, nombre) => {

    return new Promise((resolve, reject) => {
        const payload = {
            uid,
            nombre
        }
        jwt.sign(payload, secret, {expiresIn: '2h'},
            (error, token) => {
                if (error) {
                    reject('Error generando token');
                } else {
                    resolve(token);
                }
            }
        )

    

    });

}