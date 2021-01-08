const mongoose = require('mongoose');

const objectId = mongoose.Types.ObjectId; 

let schema = mongoose.Schema ;


let order = new schema ({
	tshirtId : { type: objectId , ref: 'Tshirt'},
    datetime : {type: Date , default:Date.now},
    CustomerPhoneNumber:String
});

module.exports = mongoose.model ('Order',order);