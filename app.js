
require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require('./api/users/user.router')


// app.get("/api", (req, res) =>{
//     res.json({
//         success: 1,
//         message: "this is rest api working"
//     });
// });

app.use(express.json())

app.use("/api/users", userRouter);
app.listen(3002, () =>{
    console.log("server up and running");
})