const { create, getUserByUserId, getUsers, UpdateUser, DeleteUser, getUserByUserEmail } = require('./user.service');

const { genSaltSync, hashSync, compareSync } = require('bcrypt')    // compareSync this will compare the password if match true otherwise false
const { sign } = require("jsonwebtoken")    // sign will create json token

module.exports = {
    createUser: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      // body.email = hashSync(body.email, salt);

      create(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        });
    });
},

getUserByUserId: (req, res) =>{
  const id = req.params.id;
  getUserByUserId(id, (err, results)=>{
  
    if(err){
    console.log(err);
    return;
    } 
    if(!results){
    return res.json({
      success:0,
      message: "Record not found"
    }); 
  } 
  return res.json({
    success:1,
    message: results
  });
  });
},

getUsers: (req, res) =>{
  getUsers((err, results)=>{
    if(err){
      console.log(err)
      return;
    }
    return res.json({
      success:1,
      message: results
    });
  });
},

UpdateUser: (req, res) => {
  const body = req.body;
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);
  UpdateUser(body, (err, results) => {                  // these are all callback function
    if (err) {
      console.log(err);
      return;
    }
    return res.json({
      success: 1,
      message: "updated successfully"
    });
  });
},

DeleteUser: (req, res) =>{
    const data = req.body;
    DeleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found"
        });
      }
      return res.json({
        success: 1,
        message: "user deleted successfully"
      });
    });
  },

login: (req, res) => {
  const body = req.body;          // req.body whatever user pass the data store in this variable
  getUserByUserEmail(body.email, (err, results) => {
    if (err) {
      console.log(err);
    }
    if (!results) {
      return res.json({
        success: 0,
        data: "Invalid email or password"
      });
    }
    const result = compareSync(body.password, results.password);
    if (result) {
      results.password = undefined;
      const jsontoken = sign({ result: results }, "qwe1234", {        // sign will take 3 parameter, 1st it will take objects which want sign and we want to create json web token, que1234 2nd parameter will take key encrypting, 3rd optonnal parameter

        expiresIn: "1h"
      });
      return res.json({
        success: 1,
        message: "login successfully",
        token: jsontoken
      });
    } else {
      return res.json({
        success: 0,
        data: "Invalid email or password"
      });
    }
  });
},
};
