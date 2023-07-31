const express = require('express');
const fs =require('fs');
const path =require('path');
const {MongoClient} = require('mongodb');
const { urlencoded } = require('body-parser');

const PORT = 3500;
const app = express();
const uri = `mongodb+srv://${}:${}@cluster0.eoos6vz.mongodb.net/Ecommerce?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
let db;

app.use(express.static('./public'))
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

app.post('/list',async(req,res)=>{
    try {
        const {pass,username} = req.body
        const admin = await db.collection('admin')
        const {password} = await admin.findOne({username:username})
        if(pass==password){
            res.sendFile(path.join(__dirname,'dash.html'))
        }else{
            res.sendFile(path.join(__dirname,'unauth.html'))
        }

    } catch (error) {
        res.send('error')   
    }
})

function auth(){

}
async function dbInit(){
    await client.connect();
    db = await client.db('Ecommerce');
    console.log('Db connected');
}

app.listen(PORT, async ()=>{
    console.log(`Server listening at port:${PORT}`);
    await dbInit();
})