import  mongoose  from 'mongoose';

export const dbConnection = async () =>{
    try {
        await mongoose.connect('mongodb+srv://appgestorproyectos_admin:45725251308@mycluster.bdtly.mongodb.net/App_Gestor_Proyectos');
        console.log("Base de datos conectada")
        
    } catch (error) {
        console.log(error)
        
    }
}


