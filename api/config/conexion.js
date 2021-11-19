const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://sebas:sebas123@mycluster.bdtly.mongodb.net/'
const db = 'App_Gestor_Proyectos';
const client = new MongoClient(url);

const conexion = () => {
    try {
        client.connect();
        console.log(`conexion establecida exitosamente con la bd: ${db}`);
    } catch (error) {
        console.error(error);
    }
};

conexion();

module.exports = client;