const express = require("express");
const app=express();
const bodyParser=require("body-parser");
const mysql=require("mysql");
const cors=require("cors");
const db=mysql.createPool({
  host:"localhost",
  user:"root",
  password:"autoset",
  database:"testdb"
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/item",(req,res)=>{
  const sql="select * from video";
  db.query(sql,(err,rs)=>{
    res.send(rs);
  });
});

app.post("/api/upload",(req,res)=>{
  const title=req.body.title;
  const category=req.body.category;
  const url=req.body.url;
  const sql="insert into video(title,category,url) values('"+title+"','"+category+"','"+url+"')";
  db.query(sql,[title,category,url],(err,rs)=>{
  res.send(rs);
  });
});

app.listen(4000,()=>{
  console.log("hello 4000");
});