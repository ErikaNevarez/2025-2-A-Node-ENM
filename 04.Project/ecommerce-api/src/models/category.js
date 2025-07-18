import mongoose from "mongoose";

const CategorySchema=new mongoose.CategorySchema({  /// aqui se desarrolla todo el molde 
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
        imageUrl:{
            type:String, 
            default: 'https://placehold.co/800x600.png'
        },
        parentCategory:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Category',
            default:null
        }
    });


const Category =mongoose.model('Category', CategorySchema); 

module.exports=Category; 