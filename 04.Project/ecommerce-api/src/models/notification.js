import mongoose from "mongoose";

const NotificationSchema=new mongoose.NotificationSchema({  /// aqui se desarrolla todo el molde 
    user:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'User', 
        required:true,
    }, 
    message:{
        type:String,
        required: true,
        trim:true,
    }, 
    isRead:{
        type:Boolean, 
        default:false,
    }

    });


const Notification =mongoose.model('Notification', NotificationSchema); 

module.exports=Notification; 