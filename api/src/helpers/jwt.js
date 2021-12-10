import jwt from "jsonwebtoken"; 


const secret = "mi-llave-secreta"; //esto debería ir en variable de entorno

export const generarJWT = (uid, rol) => {

    return new Promise((resolve, reject) => {
        const payload = {
            uid,
            rol
        }
        jwt.sign(payload, secret, {expiresIn: '4h'},
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