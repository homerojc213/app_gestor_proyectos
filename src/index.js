import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './graphql/schema';
import {dbConnection} from './database/config';


const app = express();

dbConnection(); //Iniciamos la conexión


app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));


app.listen(process.env.PORT || 4000, () => { //Levantando el servidor
    console.log(`Servidor corriendo en ${process.env.PORT || 4000}`);

})