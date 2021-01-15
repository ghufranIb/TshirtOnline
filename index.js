const app = require('express')();

const mongoose = require('mongoose');

const bodyParser = require('body-Parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

let Tshirt = require('./model/tshirt')
let Category = require('./model/category') 
let Order = require('./model/order') 


const db =
mongoose.connect('mongodb://localhost/ShopDB',{
 useUnifiedTopology: true,
 useNewUrlParser: true 
    
})
       
app.post('/category',function (req,res){
    
  let NewCategory = new Category() 
  NewCategory.name = req.body.name ;
    
     NewCategory.save(function(err,Savedtshirt){
          if (err) {
              res.status(500).send({error:"Coudn't add category"})
          } else {
              res.send(Savedtshirt)
          }
          
      })   
 })


app.post('/tshirt', function (req,res){
  let NewTshirt = new Tshirt() 
     
   NewTshirt.name = req.body.name ;
     NewTshirt.price = req.body.price ; 
     NewTshirt.categoryID= req.body.categoryID;
NewTshirt.availableItems=req.body.availableItems;

      NewTshirt.save(function(err,SavedTshirt){
          if (err) {
              res.status(500).send({error:"Coudn't add Tshirt"})
          } else {
              res.send(SavedTshirt)
          }
          
      })   
 })

app.get('/tshirt', function (req,res){
    
    Tshirt.find({}).populate(
        { 
            path:'categoryID',
            model:'Category',
            select : 'name'
            
        }).exec(function (err,tshirts){
        if (err) {
            res.status(500).send({error:"Errore"})
        }  else {
            
        res.send(tshirts)
             }
    })
});


app.get('/orders' ,function(req,res) 
{
    
    Order.find({}).populate(
        { 
            path:'tshirtId',
            model:'Tshirt'
            
        }).exec(function (err,orders){
        if (err) {
            res.status(500).send({error:"Errore"})
        }  else {
            
        res.send(orders)
             }
    })
});


app.put('/order', function (req,res){
let tshirtId = req.body.tshirtId
 let customerPhoneNumber = req.body.CustomerPhoneNumber
    
Tshirt.findOne({_id:tshirtId},function (err,tshirt){
    
    if (err) {
     res.status(500).send({error:"Coudn't find"})
          } else {
              
              
Tshirt.updateOne({id:tshirtId},{ $inc : {availableItems : -1} }, function(err,status){
    
    if (err) {
     res.status(500).send({error:"coudent update"})
    }  else {
        
        
        let NewOrder = new Order();
         NewOrder.tshirtId = req.body.tshirtId;
         NewOrder.CustomerPhoneNumber= req.body.CustomerPhoneNumber;
        
        
        
        
NewOrder.save(function(err,SavedOrder){
    if (err){
 res.status(500).send({error:" her errore"})
    
        
    } else {
    res.send(SavedOrder)

    }
    
})
            
    }
    
})        
   }
    
})
})
        
        



app.listen(3000,function(){
    
    console.log("Server is running in port 3000");
})