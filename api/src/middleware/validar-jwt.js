import jwt from "jsonwebtoken"; 

const secret = "mi-llave-secreta";

export const validarJwt = (req,res,next) =>{
    let token = "";
    token  = req.headers["x-access-token"] || req.headers["authorization"];
    //console.log(token)
    if(!token){
        req.user = {auth : false}
        return next();

    }

    if(token.startsWith("Bearer " )){
        token = token.slice(7, token.length); 
    }

    try {
        const {uid, rol} = jwt.verify(token, secret);
        req.user = {auth: true, rol: rol, id: uid};
        return next();
        
    } catch (error) {
        req.user = {auth : false}
        return next();
        
    }

}
