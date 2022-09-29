import { builtinModules } from "module";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/productEntity";
import { Supplier } from "../entity/supplierEntity";
import * as express from "express";//import express from "express" not working
// const express = require('express'); //not working
export const ProductRouter:express.Router= express.Router();

//Add a Product to the database 
ProductRouter.post('/add/:CompanyName',async(req,res)=>{
    const rb=req.body
    const rp=req.params
    // console.log(rp.CompanyName) 
    const ProductRepo=await AppDataSource.getRepository(Product)
    const SupplierRepo=await AppDataSource.getRepository(Supplier)
    const SupplierEntity=await SupplierRepo.findOne({where:{CompanyName:rp.CompanyName}})
    // console.log(SupplierEntity,'retrieved supplier entity') 
    if(!SupplierEntity)
    {
        return res.send('Supplier not found')
    } 
    const ProductEntity=new Product()
    ProductEntity.ProductName = rb.ProductName
    ProductEntity.UnitPrice = rb.UnitPrice
    ProductEntity.Package = rb.Package
    ProductEntity.IsDiscontinued = rb.IsDiscontinued
    ProductEntity.Supplierid=SupplierEntity
    const savedInfo=await ProductRepo.save(ProductEntity)
    if(savedInfo) 
    {
        res.send('Product added ')
    }
    else{
        res.send('Product not added')
    }
    
})

//Get all Products list
ProductRouter.get('/',async (req, res) => {
    const ProductRepo = await AppDataSource.getRepository(Product)
    const allProducts = await ProductRepo.find()
    // console.log(allProducts)
    res.send(allProducts)
})

//Get a Product details with help of his ProductName and company

ProductRouter.get('/:CompanyName/:ProductName',async (req, res) => {
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
})

//Update a Product phone with help of company name
//[?] How can I give more than one parameter in url 
ProductRouter.put('/edit/UnitPrice/:CompanyName/:ProductName/',async(req, res)=>{
    const rp=req.params
    const rb=req.body
    const ProductRepo = await AppDataSource.getRepository(Product)
    const ProductEntities = await ProductRepo.find({where:{ProductName: rp.ProductName},relations:['Supplierid']})
    // console.log(ProductEntities)
    const arr1:Product[]=await ProductEntities.filter((item)=>{
        // console.log(item.Supplierid.CompanyName)
        if(item.Supplierid.CompanyName === rp.CompanyName) 
        {
            return item;
        }
        
    })
    //console.log(arr1)
    const result = arr1[0]
    //console.log(result)
    result.UnitPrice = rb.UnitPrice
    await ProductRepo.save(result)
    res.send('product updated successfully')


})

//delete the Product based on company name
ProductRouter.delete('/delete/:CompanyName/:ProductName/',async(req, res)=>{
    const rp=req.params
    const rb=req.body
    const ProductRepo = await AppDataSource.getRepository(Product)
    const ProductEntities = await ProductRepo.find({where:{ProductName: rp.ProductName},relations:['Supplierid']})
    const arr1:Product[]=ProductEntities.filter((item)=>{
        if(item.Supplierid.CompanyName === rp.CompanyName) 
        {
            return item;
        }
        
    })
    const result = arr1[0]
    await ProductRepo.delete(result.id) 
    res.send('product deleted successfully')

})

// module.exports= {ProductRouter} //not working[D]