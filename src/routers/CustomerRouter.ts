import { builtinModules } from "module";
import { AppDataSource } from "../data-source";
import { Customer } from "../entity/customerEntity";

import * as express from "express";//import express from "express" not working
// const express = require('express'); //not working
export const CustomerRouter:express.Router= express.Router();

//Add a Customer to the database 
CustomerRouter.post('/add',async(req,res)=>{
    const rb=req.body
    const CustomerRepo=await AppDataSource.getRepository(Customer)
    const CustomerEntity=new Customer()
    // console.log(CustomerEntity,'CustomerEntity is created')
    // console.log(req)
    CustomerEntity.FirstName = rb.FirstName
    CustomerEntity.LastName = rb.LastName
    CustomerEntity.City = rb.City
    CustomerEntity.Country = rb.Country
    CustomerEntity.Phone = rb.Phone
    const savedInfo=await CustomerRepo.save(CustomerEntity)
    if(savedInfo) 
    {
        res.send('Customer added ')
    }
    else{
        res.send('Customer not added')
    }
    
})

//Get all Customers list
CustomerRouter.get('/',async (req, res) => {
    const CustomerRepo = await AppDataSource.getRepository(Customer)
    const allCustomers = await CustomerRepo.find()
    // console.log(allCustomers)
    res.send(allCustomers)
})

//Get a Customer with help of his FirstName 
CustomerRouter.get('/:FirstName',async (req, res) => {
    const rp=req.params
    const CustomerRepo = await AppDataSource.getRepository(Customer)
    const requiredCustomer = await CustomerRepo.find({where:{FirstName:rp.FirstName}})
    // console.log(allCustomers)
    res.send(requiredCustomer)
})

//Update a Customer phone with help of company name
//[?] How can I give more than one parameter in url 
CustomerRouter.put('/edit/phone/:FirstName',async(req, res)=>{
    const rp=req.params
    const rb=req.body
    const CustomerRepo = await AppDataSource.getRepository(Customer)
    //[?] is there any other way to update
    const requiredCustomer = await CustomerRepo.findOne({where:{FirstName:rp.FirstName}})
    requiredCustomer.Phone= rb.Phone
    await CustomerRepo.save(requiredCustomer)
    res.send('phone updated successfully')


})

//delete the Customer based on company name
CustomerRouter.delete('/:FirstName',async(req, res)=>{
    const rp=req.params
    const CustomerRepo= await AppDataSource.getRepository(Customer);

    /*
    const ProductRepo = await AppDataSource.getRepository(Product)
    const ProductEntities = await ProductRepo.find({relations:['Customerid']})
    ProductEntities.forEach((item)=>{
        if(item.Customerid.CompanyName === rp.companyName)
        {
            ProductRepo.delete(item.id)
        }
    })
    */

    const deletedInfo=await CustomerRepo.delete({FirstName:rp.FirstName})
    if(deletedInfo)
    {
        res.send(`Customer deleted successfully`)
    }
    else{
        res.send(`Customer not found`)
    }

})

// module.exports= {CustomerRouter} //not working[D]