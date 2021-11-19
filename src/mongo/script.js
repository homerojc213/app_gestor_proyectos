const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://sebas:sebas123@mycluster.bdtly.mongodb.net/'
const client = new MongoClient(url);
const db = 'App_Gestor_Proyectos';

async function conectar() {

}

const insertOne = async (dato, coleccion) => {
    await client.connect();
    console.log(`conexion establecida exitosamente con la bd: ${db}`)
    const collection = client.db(db).collection(`${coleccion}`);
    const insertOneResult = await collection.insertOne(dato);
    console.log(insertOneResult);
    client.close();
}

module.exports = {
    insertOne
}