const mysql = require('mysql');
const config = require('./../../src/config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

//Conexión
let conexion;

function conMysql(){
    conexion = mysql.createConnection(dbconfig);
    conexion.connect((err) => {
        if(err){console.log('[db err]', err); setTimeout(conMysql, 200);}
        else {console.log('DB conectada')}
    });
    conexion.on('error', err =>{
        console.log('[db_error]', err);
        setTimeout(conMysql, 200);

        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            conMysql();
        } else {
            throw err;
        }
    })
}

conMysql();

//-----------------------------------
//Métodos

function todos(tabla){
    return new Promise( (resolve, reject) => {
        conexion.query(`select * from ${tabla}`, (error, result) => {
            return error? reject(error) : resolve(result);
        });
    });
}

function uno(tabla, id){
    return new Promise( (resolve, reject) => {
        conexion.query(`select * from ${tabla} where id=${id}`, (error, result) => {
            return error? reject(error) : resolve(result);
        });
    }); 
}

function eliminar(tabla, data){
    return new Promise( (resolve, reject) => {
        conexion.query(`delete from ${tabla} where id = ?`, data.id, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    }); 
}

function agregar(tabla, data){
    //console.log('antes ' + data.id);
    return new Promise( (resolve, reject) => {
        conexion.query(`insert into ${tabla} set ? on duplicate key update ?`, [data, data], (error, result) => {
            console.log('después ' + result.id);
            return error ? reject(error) : resolve(result);
        });
    }); 
}

module.exports = {
    todos, uno, agregar, eliminar, //actualizar
}