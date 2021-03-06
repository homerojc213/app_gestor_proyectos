import jwt from "jsonwebtoken"; 


const secret = "mi-llave-secreta"; //esto debería ir en variable de entorno

export const generarJWT = (uid, nombres, rol, estado) => {

    return new Promise((resolve, reject) => {
        const payload = {
            uid,
            nombres,
            rol,
            estado
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