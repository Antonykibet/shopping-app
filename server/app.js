const express = require('express');
const fs =require('fs');
const path =require('path');
const {MongoClient} = require('mongodb');
const { urlencoded } = require('body-parser');

const PORT = 3500;
const app = express();
const uri = `mongodb+srv://antonykibet059:123Acosta@cluster0.eoos6vz.mongodb.net/Ecommerce?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
let db;
  
app.use(express.static('Public'))
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

app.post('/login',async(req,res)=>{
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

app.get('/users',async(req,res)=>{
    const usersCollection = await db.collection('Users');
    const usersArray = await  usersCollection.find().toArray();
    console.log(usersArray)
    res.json(usersArray)
})
app.get('/addUsers',(req,res)=>res.sendFile(__dirname,'addUser.html'))
async function dbInit(){
    await client.connect();
    db = await client.db('Ecommerce');
    console.log('Db connected');
}

app.listen(PORT, async ()=>{
    console.log(`Server listening at port:${PORT}`);
    await dbInit();
})