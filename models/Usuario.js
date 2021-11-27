//Esquema mongoose para usuarios
const {Schema, model} = require('mongoose');

const usuarioSchema = new Schema({
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    identificacion: {
        type: String,
        required: true,
        unique: true
    },
    correo: {
        type: String,
        required: true
    },
    clave: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    }
},
{
    collection: 'Usuarios'
});

module.exports = model('Usuario', usuarioSchema);

