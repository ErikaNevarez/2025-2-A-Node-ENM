import mongoose from "mongoose";

const CartSchema=new mongoose.CartSchema({  /// aqui se desarrolla todo el molde 
    user:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'User', 
        required:true,
    }, 
    products: [{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product', 
            required:true,
        }, 
        quantity:{
            type:Number, 
            required: true, 
            min:1, 
        }

    }]

    });


const Cart =mongoose.model('Cart', CartSchema); 

module.exports=Cart; 