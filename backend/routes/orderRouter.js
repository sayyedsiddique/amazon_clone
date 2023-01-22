import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModal.js";
import { isAuth } from "../utils.js";
const orderRouter = express.Router()

// Create order 
orderRouter.post('/', isAuth,  expressAsyncHandler(async(req, res) => {
    if(req.body.orderItems.length === 0){
        res.status(400).send({message: 'Cart is empty'})
    } 
    else 
    {
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippinPrice: req.body.shippinPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user.id,

        })
        
        const createdOrder = await order.save()
        res.status(200).send({message: 'New order created', order: createdOrder})
    }
}))

// GET single order
orderRouter.get('/:id', isAuth, expressAsyncHandler(async(req, res) => {
    console.log("req.params.id ", req.params.id)
    const order = await Order.findById(req.params.id)
    console.log("order ", order)
    if(order){
        res.send({order: order})
    } else{
        res.status(404).send({message: 'Order not found'})
    }
}))

export default orderRouter