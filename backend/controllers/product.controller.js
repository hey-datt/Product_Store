//step-14
import Product from "../models/products.model.js"
import mongoose from 'mongoose';

export const addProduct = async(req, res) => {
    const product = req.body; //user will send this data

    if (!product.name || !product.price || !product.image) {
        //if user sends product name or price or image as empty
        return res.status(400).json({
            success: false,
            message: "Please provide all fields",
        });
    }
    //if user sends correct data
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({
            success: true,
            data: newProduct,
        });
    } catch (error) {
        console.log("Error in create Product ", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export const deleteProduct = async(req, res) => {
    // const paramTest = req.params;
    // console.log("Test Param", paramTest); //-> {id: '123'}
    const { id } = req.params; //->extracting id from route
    // console.log("ID", id);

    //handling 404 -> Not found product by id given
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({
            success: false,
            message: "Invalid Product ID",
        });
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Successfully deleted ",
        });
    } catch (error) {
        console.log("Error in deleting data", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
}

export const fetchProducts = async(req, res) => {
    try {
        const product = await Product.find({}); //to find all products present in db
        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        console.log("Error while fetching products", error.message);
        req.status(404).json({
            success: false,
            message: "Server Error",
        });
    }
}

export const updateProduct = async(req, res) => {
    const { id } = req.params;

    const updateInfo = req.body;

    //handling 404 -> Not found product by id given
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({
            success: false,
            message: "Invalid Product ID",
        });
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, updateInfo, {
            new: true,
        });
        res.status(200).json({
            success: true,
            data: updatedProduct,
        });
    } catch (error) {
        console.log("Error while updating", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
