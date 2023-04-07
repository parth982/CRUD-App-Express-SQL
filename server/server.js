const express = require('express');
const app = express();
const {DB} = require('./DB/dbservice');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const crud_router = require('./routes/crud_routes');

app.use('/',crud_router);

const PORT = process.env.PORT || 1000;

DB.connect((err)=>{
    if(err) console.log(err);
    console.log('DB ' + DB.state);
    app.listen(PORT,()=> console.log(`Server is Listening on PORT ${PORT}`));
});