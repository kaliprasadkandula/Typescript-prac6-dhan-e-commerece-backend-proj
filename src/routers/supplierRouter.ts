import { builtinModules } from "module";
import { AppDataSource } from "../data-source";
import { Supplier } from "../entity/supplierEntity";
import {Product} from "../entity/productEntity";
import * as express from "express";//import express from "express" not working
// const express = require('express'); //not working
export const supplierRouter:express.Router= express.Router();

//Add a supplier to the database 
supplierRouter.post('/add',async(req,res)=>{
    const rb=req.body
    const supplierRepo=await AppDataSource.getRepository(Supplier)
    const supplierEntity=new Supplier()
    // console.log(supplierEntity,'supplierEntity is created')
    // console.log(req)
    supplierEntity.CompanyName = rb.companyName
    supplierEntity.ContactName = rb.contactName
    supplierEntity.City = rb.city
    supplierEntity.Country = rb.country
    supplierEntity.Phone = rb.phone
    supplierEntity.Fax = rb.fax
    const savedInfo=await supplierRepo.save(supplierEntity)
    if(savedInfo) 
    {
        res.send('supplier added ')
    }
    else{
        res.send('supplier not added')
    }
    
})
//Get all suppliers list
supplierRouter.get('/',async (req, res) => {
    const supplierRepo = await AppDataSource.getRepository(Supplier)
    const allSuppliers = await supplierRepo.find()
    // console.log(allSuppliers)
    res.send(allSuppliers)
})
//Get a supplier with help of his companyName 
supplierRouter.get('/:companyName',async (req, res) => {
    const rp=req.params
    const supplierRepo = await AppDataSource.getRepository(Supplier)
    const requiredSupplier = await supplierRepo.find({where:{CompanyName:rp.companyName}})
    // console.log(allSuppliers)
    res.send(requiredSupplier)
})

//Update a supplier phone with help of company name
//[?] How can I give more than one parameter in url 
supplierRouter.put('/edit/phone/:companyName',async(req, res)=>{
    const rp=req.params
    const rb=req.body
    const supplierRepo = await AppDataSource.getRepository(Supplier)
    //[?] is there any other way to update
    const requiredSupplier = await supplierRepo.findOne({where:{CompanyName:rp.companyName}})
    requiredSupplier.Phone= rb.phone
    await supplierRepo.save(requiredSupplier)
    res.send('phone updated successfully')


})
//delete the supplier based on company name
supplierRouter.delete('/:companyName',async(req, res)=>{
    const rp=req.params
    const supplierRepo= await AppDataSource.getRepository(Supplier)
    const ProductRepo = await AppDataSource.getRepository(Product)
    const ProductEntities = await ProductRepo.find({relations:['Supplierid']})
    ProductEntities.forEach((item)=>{
        if(item.Supplierid.CompanyName === rp.companyName)
        {
            ProductRepo.delete(item.id)
        }
    })

    const deletedInfo=await supplierRepo.delete({CompanyName:rp.companyName})
    if(deletedInfo)
    {
        res.send(`supplier deleted successfully`)
    }
    else{
        res.send(`supplier not found`)
    }

})

// module.exports= {supplierRouter} //not working[D]