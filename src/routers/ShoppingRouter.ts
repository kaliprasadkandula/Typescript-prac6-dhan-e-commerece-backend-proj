import { builtinModules } from "module";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/productEntity";
import { Supplier } from "../entity/supplierEntity";
import {Customer} from "../entity/customerEntity";
import { Order } from "../entity/OrderEntity";
import { OrderItem } from "../entity/OrderItemEntity";
import * as express from "express";//import express from "express" not working
import console = require("console");
// const express = require('express'); //not working
export const ShoppingRouter:express.Router= express.Router();

//Add a Product to the database 
ShoppingRouter.post('/',async(req,res)=>{

    const rb=req.body
    const rp=req.params
    const CustomerRepo= await AppDataSource.getRepository(Customer)
    const ProductRepo=await AppDataSource.getRepository(Product)
    const OrderRepo=await AppDataSource.getRepository(Order)
    const OrderItemRepo=await AppDataSource.getRepository(OrderItem)


    const FirstName:string=rb.CustomerName  
    const CustomerEntity=await CustomerRepo.findOne({where: {FirstName:FirstName}})
    const OrderDate=new Date()
    const Quantity:number=rb.Quantity
    const ProductEntity:Product=await ProductRepo.findOne({where: {ProductName:rb.ProductName}})
    console.log(ProductEntity)
    const UnitPrice=ProductEntity.UnitPrice
    console.log(ProductEntity.UnitPrice)
    const OrderEntity=new Order()
    OrderEntity.OrderDate=OrderDate
    OrderEntity.CustomerId=CustomerEntity 
    OrderEntity.TotalAmount=UnitPrice*Quantity 
    const OrderId=await OrderRepo.save(OrderEntity)
    // console.log(OrderId,'This is OrderId')
    const OrdrerItemEntity=new OrderItem() 
    OrdrerItemEntity.OrderId=OrderId
    OrdrerItemEntity.ProductId=ProductEntity
    OrdrerItemEntity.UnitPrice=UnitPrice
    OrdrerItemEntity.Quantity=Quantity

    
    const OrderInfo=await OrderItemRepo.save(OrdrerItemEntity)
    if(OrderInfo)
    {
        return res.send('Order Confirmed')

    }
    else
    {
        return res.send('Order Failed,Try again later')
    }
   
})


//Get all Orders list with the help of customer name
ShoppingRouter.get('/:CustomerName',async (req, res) => {
    const rb=req.body

    const OrderRepo = await AppDataSource.getRepository(Order)
    const CustomerRepo = await AppDataSource.getRepository(Customer)
    const CustomerEntity=await CustomerRepo.findOne({where: {FirstName: rb.CustomerName}})
    const OrderEntities=await OrderRepo.find({relations:['CustomerId']})
    const Orders:Order[]=[]
    OrderEntities.forEach((OrderEntity:Order) => {
        //console.log(CustomerEntity)
        if(OrderEntity.CustomerId.id==CustomerEntity.id)
        {
            // console.log('hai')
            Orders.push(OrderEntity)
        }
    })
    res.send(Orders)  
    // const allProducts = await ProductRepo.find()
    // console.log(allProducts)
    // res.send(allProducts)
})
/*
//Get a Product details with help of his ProductName and company

ShoppingRouter.get('/:CompanyName/:ProductName',async (req, res) => {
    const rp=req.params
    const ProductRepo = await AppDataSource.getRepository(Product)
    // const SupplierRepo =await AppDataSource.getRepository(Supplier)
    // const SupplierEntities = await SupplierRepo.find({where: {CompanyName: rp.CompanyName}})
    const ProductEntities = await ProductRepo.find({where:{ProductName: rp.ProductName},relations:['Supplierid']})
    
    const arr1:Product[]=await ProductEntities.filter((item)=>{
        // console.log(item.Supplierid.CompanyName)
        if(item.Supplierid.CompanyName === rp.CompanyName) 
        {
            return item;
        }
        
    })
    const result = arr1[0]
    // console.log(arr1)
    
    res.send(result)
})*/

//Update an order quantity  with help of orderItemid

ShoppingRouter.put('/edit/:OrderItemId',async(req, res)=>{ 
    const rp=req.params
    const rb=req.body
    const idNum=Number(rp.OrderItemId)
    const OrderItemRepo = await AppDataSource.getRepository(OrderItem)
    const OrderRepo = await AppDataSource.getRepository(Order)
    const OrderItemEntity= await OrderItemRepo.findOne({where:{id:idNum},relations:['OrderId']})
    // console.log(OrderItemEntity)
    const OrderEntity=await OrderRepo.findOne({where:{id:OrderItemEntity.OrderId.id}})
    
    OrderItemEntity.Quantity=rb.Quantity
    OrderEntity.TotalAmount=rb.Quantity*OrderItemEntity.UnitPrice

    await OrderRepo.save(OrderEntity)
    await OrderItemRepo.save(OrderItemEntity)

    res.send('updated quantity')

})

//delete the Order based on OrderId
ShoppingRouter.delete('/delete/:OrderItemId',async(req, res)=>{
    const rp=req.params
    const rb=req.body
    const OrderRepo = await AppDataSource.getRepository(Order)
    const numb=Number(rp.OrderItemId)
    const OrderEntity = await OrderRepo.findOne({where:{id:numb},relations:['OrderItems']})
    console.log(OrderEntity)
    const deletedInfo = await OrderRepo.delete({id:OrderEntity.id})
    console.log(deletedInfo)
    if (deletedInfo.affected){
        res.send('Order deleted successfully')//both order and orderItems deleted 

    }
    else{
        res.send('Order not deleted ')
    }

})

// module.exports= {ShoppingRouter} //not working[D]