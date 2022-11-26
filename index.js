let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 7900;
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let mongoUrl = process.env.LiveMongo;
let cors=require('cors');
let bodyParser = require('body-parser')
let db;

//Middleware
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send('hii from Local Server')
})

//list of glasses wrt frame type or frame shape or frame color
app.get('/glasses',(req,res)=>{
    let TypeId = Number(req.query.TypeId)
    let ShapeId = Number(req.query.ShapeId)
    let ColorId = Number(req.query.ColorId)
    let query={}
    if(TypeId){
        query= {frametype_id:TypeId}
    }else if(ShapeId){
        query= {frameshape_id:ShapeId}
    }else if(ColorId){
        query= {framecolor_id:ColorId}
    }else{
        query={}
    }
    db.collection('glasses').find(query).toArray((err, result)=>{
        if (err) throw err;
        res.send(result)
    })
})

//list of glasses wrt frame type & frame shape
app.get('/filter/:TypeId',(req,res) => {
    let query = {};
    let TypeId = Number(req.params.TypeId)
    let ShapeId = Number(req.query.ShapeId)
     if(ShapeId){
        query={
            "frametype_id":TypeId,
            "frameshape_id":ShapeId
        }
    }else{
        query={
            "frametype_id":TypeId
        }
    }
    db.collection('glasses').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//list of glasses wrt frame type & frame color
app.get('/filter/:TypeId',(req,res) => {
    let query = {};
    let TypeId = Number(req.params.TypeId)
    let ColorId = Number(req.query.ColorId)
     if(ShapeId){
        query={
            "frametype_id":TypeId,
            "framecolor_id":ColorId
        }
    }else{
        query={
            "frametype_id":TypeId
        }
    }
    db.collection('glasses').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//details of selected glasses
app.get('/details/:Id',(req,res)=>{
    let Id = Number(req.params.Id)
    db.collection('glasses').find({id:Id}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//Items added to cart(wishlist)
app.post("/cart",(req,res)=>{
    if(Array.isArray(req.body.id)){
      db.collection('glasses').find({id:{$in:req.body.id}}).toArray((err,result)=>{
        if (err) throw err;
        res.send(result);
      })
    }else{
      res.send('Invalid Input');
    }
  })

// order
app.get('/orders',(req,res)=>{
    //let email = req.query.email
    let email = req.query.email;
    let query = {}
    if(email){
        //query={email:email}
        query={email}
    }else{
        query={}
    }
    db.collection('orders').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//placeorder
app.post('/placeOrder',(req,res) => {
        db.collection('orders').insertOne(req.body,(err,result) => {
            if(err) throw err;
            res.send('order placed')
    }) 
})
    
//Update order
app.put("/updateOrder/:order_id",(req,res)=>{
    let order_Id=Number(req.params.order_id);  
    db.collection('orders').updateOne(
      {order_id:order_Id},
      {
        $set:{
          "status":req.body.status,
          "Bank_Details": req.body.bank_name,
          "date":req.body.date
        }
      },(err,result)=>{
        if(err) console.log(order_id);
        res.send("Order updated");
      })
  
  })

//deleteOrder
app.delete('/deleteOrder/:id',(req,res) => {
    let _id = mongo.ObjectId(req.params.id);
    db.collection('orders').remove({_id},(err,result) => {
        if(err) throw err;
        res.send('Order Deleted')
    })
})

//connection with db
MongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.log('Error while connecting');
    db = client.db('lenskart');
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`)
    })

})
