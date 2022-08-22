const { createUser, getUserByUserId, getUsers, UpdateUser, DeleteUser, login  } = require('./user.controller');
const router = require("express").Router();
const { checkToken } = require("../../../auth/token_validation")


router.post("/", checkToken, createUser);
router.get("/", checkToken, getUsers);
router.get("/:id", checkToken, getUserByUserId);
router.put("/", checkToken, UpdateUser);
router.delete("/", checkToken, DeleteUser);
router.post("/login", login );                    //return the json web token to the user and evaliate token


module.exports = router;
