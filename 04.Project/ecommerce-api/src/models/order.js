import mongoose from "mongoose";

const OrderSchema=new mongoose.OrderSchema({  /// aqui se desarrolla todo el molde 
    user: {}, 
    products: [{}], 
    shippingAdress: {},
    paymentMethod: {}, 
    shippingCost: {},
    taxes:{}, 
    totalPrice:{}, 
    status:{}, 
    paymentStatus:{}, 

    });


const Order =mongoose.model('Order', OrderSchema); 

module.exports=Order; 