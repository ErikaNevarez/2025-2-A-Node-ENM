import mongoose from "mongoose";

const productSchema=new mongoose.productSchema({  /// aqui se desarrolla todo el molde 
    name:{
        type:String,
        required: true,
        trim:true,
    }, 
    description:{
        type:String,
        required: true,
        trim:true,
    },
    price:{
        type:Number,
        required: true,
        min:0
    },
    stock:{      
        type:String,
        required: true,
        min:0
    }, 
    imagesUrl:{
        type:String, 
        default: 'https://placehold.co/800x600.png'
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true, 
    }




    });


const Product =mongoose.model('Product', productSchema); 

module.exports=Product; 