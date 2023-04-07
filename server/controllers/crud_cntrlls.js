const DBService = require('../DB/db_service');

// GET ALL DATA
const All_Data = async (req,res)=>{
    try{
        const db = DBService.getDBServiceInstance();
        const Info = await db.getAllData();
        res.json({data: Info});
    }catch(err){console.log(err);} 
};

// ADD SINLE ROW
const add_Data = (req,res)=>{
    const {name} = req.body;
    const db = DBService.getDBServiceInstance();

    const result = db.insertNewName(name);
    result
    .then(Info => res.json({data: Info}))
    .catch(err => console.log(err));
};

// DELETE SINGLE ROW
const remove_Data = (req,res)=>{
    const {id} = req.params;
    const db = DBService.getDBServiceInstance();
    
    const result = db.deleteRowByID(id);
    result
    .then(data => res.json({success: data}))
    .catch(err => console.log(err));
};

// UPDATE SINGLE ROW
const update_Data = (req,res)=>{
    const {id ,name} = req.body;
    const db = DBService.getDBServiceInstance();

    const result = db.updateNameByID(id,name);
    result
    .then(data => res.json({success: data}))
    .catch(err => console.log(err));
};  


// GET SINGLE ROW
const One_Row = (req,res)=>{
    const {name} = req.params;
    const db = DBService.getDBServiceInstance();

    const result = db.searchByName(name);
    result
    .then(Info => res.json({data: Info}))
    .catch(err => console.log(err));
};  

module.exports = {
    All_Data,
    add_Data,
    remove_Data,
    update_Data,
    One_Row
};