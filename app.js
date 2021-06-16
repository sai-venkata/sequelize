import express, { urlencoded } from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import{db,Product,User} from './model/model.js'
const port = process.env.PORT || 5200
const app = new express()


//middle wares
app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(cors())


app.get('/',async(req,res)=>{
    
    res.send("<h1><center>health check</center></h1>");
})

app.get("/allUsers", async (req, res) => {
  let allUsers = await User.findAll();
  res.send(allUsers);
});

app.get("/allProducts", async (req, res) => {
  let allProducts = await Product.findAll();
  res.send(allProducts);
});

app.post('/userRegister',async(req,res)=>{
    const userInfo = {
        name : req.body.name,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password,8)
    }

    try{
        let newUser = await User.create(userInfo)
        res.send(newUser.dataValues)
    }
    catch(err){
        res.status(406).send({errorMessage:err})
    }
})

app.post('/productRegister',async(req,res)=>{
    const productInfo = {
        name : req.body.name,
        description : req.body.description,
        imageUrl : req.body.imageUrl,
        price: req.body.price    
    }

    try{
        let newProduct = await Product.create(productInfo);
        res.send(newProduct.dataValues)
    }
    catch(err){
        res.status(406).send({errorMessage:err.message})
    }
})



app.listen(port , async(err) =>{
    if(err) throw err
    await db.sync();
    console.log("server running on port 5200")
})