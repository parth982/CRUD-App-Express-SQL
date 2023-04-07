const DB = require('./db_connect.js');

let instance = null;
class DBService {
    static getDBServiceInstance(){
        return instance ? instance : new DBService();
    }

    async getAllData(){
        try{
            const Info = await new Promise((resolve,reject)=>{
                const query = 'SELECT * FROM info;'
                DB.query(query,(err,results)=>{
                    if(err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            // Info is Array which consist of tuples/rows in 'info' table
            // console.log(Info);
            return Info;
        }catch(err){console.log(err);}
    }

    async insertNewName(name){
        try{
            const dateAdded = new Date();
            const Info = await new Promise((resolve,reject)=>{
                const query = 'INSERT INTO info (name,date_added)VALUES (? ,?)';
                DB.query(query,[name,dateAdded],(err,result)=>{
                    if(err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            return {
                id: Info.insertId,
                name,
                date_added: dateAdded
            }
        }catch(err){console.log(err); }
    }

    async deleteRowByID(id){
        try{
            id = parseInt(id);
            const Info = await new Promise((resolve,reject)=>{
                const query = 'DELETE FROM info WHERE info.id = ?';
                DB.query(query,[id],(err,result)=>{
                    if(err) reject(new Error(err.message));
                    resolve(result);
                });
            })
            return Info.affectedRows===1 ? true : false;
        }catch(err){console.log(err);}
    }
    
    async updateNameByID(id, name){
        try{
            id = parseInt(id);
            const Info = await new Promise((resolve,reject)=>{
                const query = 'UPDATE info SET name = ? WHERE id = ?';
                DB.query(query,[name,id],(err,result)=>{
                    if(err) reject(new Error(err.message));
                    resolve(result);
                });
            })
            return Info.affectedRows===1 ? true : false;
        }catch(err){console.log(err);}
    }

    async searchByName(name){
        try{
            const Info = await new Promise((resolve,reject)=>{
                const query = "SELECT * FROM info WHERE name = ?;";
                DB.query(query,[name],(err,results)=>{
                    if(err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return Info;
        }catch(err){console.log(err);}
    }
}

module.exports = DBService; 

