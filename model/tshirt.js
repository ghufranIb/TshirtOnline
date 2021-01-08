const mongoose = require('mongoose') ;

let schema =mongoose.Schema;

const objectId = mongoose.Types.ObjectId; 

let tshirt = new schema ({
 
   name : String ,
   price :Number,
    categoryID :{ type: objectId, ref: 'category'},
    availableItems :Number
   
    
});
    
module.exports = mongoose.model ('Tshirt',tshirt);

