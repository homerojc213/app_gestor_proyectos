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
        const {uid, nombres, rol, estado} = jwt.verify(token, secret);
        req.user = {auth: true, nombres: nombres, rol: rol, id: uid , estado: estado};
        return next();
        
    } catch (error) {
        req.user = {auth : false}
        return next();
        
    }

}
