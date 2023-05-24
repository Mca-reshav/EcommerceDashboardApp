const express=require('express')
const app=express();
require('./db/Config')
const Users=require('./db/Users')
const Products=require('./db/Products')
const cors=require('cors')
const Jwt=require('jsonwebtoken');
const jwtKey='e-comm'


app.use(express.json());
app.use(cors());

app.post('/register',async(req,resp)=>{
    if(req.body.name && req.body.email && req.body.password){
        let user=new Users(req.body);
        let result=await user.save();
        result=result.toObject();
        delete result.password
        Jwt.sign({result},jwtKey,{expiresIn:"1h"},(err,token)=>{
            if(err){
                resp.send({result:"Something wents wrong"})
            }
            resp.send({result,auth:token})
        })
    }else{
        resp.send({result:"Enter proper details"})
    }
   
})
app.post('/login',async(req,resp)=>{
    console.log(req.body)
    if(req.body.password && req.body.email){
        let user=await Users.findOne(req.body).select('-password');
        if(user){
            Jwt.sign({user},jwtKey,{expiresIn:"1h"},(err,token)=>{
                if(err){
                    resp.send({result:"Something wents wrong"})
                }resp.send({user,auth:token})
            })
        }else{
            resp.send({result:"No Record Found"})
        }
    }else{
        resp.send({result:"Invalid Attempt"})
    }
})

app.post('/add-products',verifyToken,async(req,resp)=>{
        let product=new Products(req.body)
        let result=await product.save();
        resp.send(result)
    
   
})
app.get('/product-list',verifyToken,async(req,resp)=>{
    let data=await Products.find();
    if(data.length>0){
        resp.send(data)
    }else{
        resp.send({result:"No Record Found"})
    }
})
app.delete('/product/:id',verifyToken,async(req,resp)=>{
    const result=await Products.deleteOne({_id:req.params.id})
    resp.send(result);
    //resp.send(req.params.id)
})
app.get('/update-product/:id',verifyToken,async(req,resp)=>{
    let result=await Products.findOne({_id:req.params.id})
    if(result){
        resp.send(result)
    }else{
        resp.send({result:"No Record Matched"})
    }
})
app.put('/update-product/:id',verifyToken,async(req,resp)=>{
    let result=await Products.updateOne({_id:req.params.id},{$set:req.body})
    resp.send(result)
})
app.get('/search/:key',verifyToken,async(req,resp)=>{
    let result=await Products.find({
        "$or":[{name:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {category:{$regex:req.params.key}}]
    })
    resp.send(result)
})
function verifyToken(req,resp,next){    //middleware: it takes three argument
    let token=req.headers['authorization'];
    if(token){
        token=token.split(' ')[1];
        Jwt.verify(token,jwtKey,(err,valid)=>{
            if(err){
                resp.status(401).send({result:"Please provide valid token"})
            }else{
                next();
            }
        })
    }else{
        resp.status(403).send({result:"Please add token with header"})
    }
    console.log(token)
}


app.listen(5600);