//step-7

import express from "express";
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

//step-8 -> creating products to store in db
router.post("/", addProduct);

//Step-9 -> check the API with PostMAN or ECHO-API

//Step-10 -> an endpoint to delete a product by "id"
router.delete("/:id", deleteProduct);

//step-11 ->an endpooint to fetch all the products in db
router.get("/", fetchProducts);

//step-12 -> an endpooint to upate the products wrt id
router.put("/:id", updateProduct);

export default router;

//go back to server.js to see step-13
//step 14 to step-17 in controllers/product.controller.js
