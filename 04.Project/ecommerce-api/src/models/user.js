import mongoose from "mongoose";

const userSchema=new mongoose.userSchema({       /// aqui se desarrolla todo el molde 
    displayName:{
        type:String,
        required: true,
        trim:true,
    }, 
    email:{
        type:String,
        required:true, 
        trim:true,
        unique:true, 
        match: [
        /^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/,
        'Please use a valid email address'
        ]
    },
    hashPassword:{
        type:String,
        required:true
    },  //es para contraseñas encriptadas
    role:{
        type:String,
        required:true,
        enum: ['admin', 'costumer', 'guest'],
    }, 
    avatar:{
        type:String,
        required:true, 
        default: 'https://placehold.co/100x100.png'
    }, 
    phone:{
        type:String,
        max:10,
    },
    isActive:{
        type:Boolean,
        default:true,
    }
    });


const User =mongoose.model('User', userSchema); 

module.exports=User; 