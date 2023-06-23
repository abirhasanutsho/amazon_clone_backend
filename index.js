const express = require("express");
const mongoose = require("mongoose");
const appRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");

const app = express();

app.use(express.json());

 app.use(appRouter);
 app.use(adminRouter);

const PORT = 5000;

mongoose.connect("mongodb+srv://abirhasanutsho:admin123@cluster0.wo36f7h.mongodb.net/ecommerce_backend").then(()=>{
    console.log("Mongo DB Connected");
});

app.listen(PORT,"192.168.0.102",()=>{
    console.log("Server Run");
});



