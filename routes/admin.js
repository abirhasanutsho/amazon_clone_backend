const express = require("express");

const admin = require("../middleware/admin");
const Product = require("../model/product");


const adminRouter = express.Router();

// Now Middleware Created 

adminRouter.post("/admin/add-product", admin, async (req, res) => {
    try {
        const { name, description, images, quantity, price, category } = req.body;
        let product = new Product({
            name,
            description,
            images,
            quantity,
            price,
            category,
        });
        product = await product.save();
        res.json(product);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

adminRouter.get("/admin/get-product", admin, async (req, res) => {


    try {
        const product = await Product.find({});


        res.json(product);

    } catch (error) {

    }


});
adminRouter.post("/admin/get-product", admin, async (req, res) => {


    try {
        const { id } = req.body;
        const product = await Product.findByIdAndDelete(id);


        res.json(product);

    } catch (error) {

    }


});



module.exports = adminRouter;
