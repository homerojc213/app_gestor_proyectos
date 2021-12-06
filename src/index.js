import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './graphql/schema';
import {dbConnection} from './database/config';
import { validarJwt } from './middleware/validar-jwt';


const app = express();

dbConnection(); //Iniciamos la conexión

app.use(validarJwt);

app.use("/graphql", graphqlHTTP( (req) => ({

    graphiql : true,
    schema : schema,
    context : {
        user : req.user
    }
})));


app.listen(process.env.PORT || 4000, () => { //Levantando el servidor
    console.log(`Servidor corriendo en ${process.env.PORT || 4000}`);

})