const express = require('express');
const {graphqlHTTP} = require('express-graphql');

const schema = require('./graphql/schema');
const {dbConnection} = require("./database/config.js");




const app = express();


dbConnection(); //Iniciamos la conexión


app.get('/', function (req, res) { //Endpoint
    res.send('Hello World!');
});


app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
    
}));

app.listen(process.env.PORT || 4000, () => { //Levantando el servidor
    console.log(`Servidor corriendo en ${process.env.PORT || 4000}`);

});
