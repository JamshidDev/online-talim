const express = require("express");
const router = express.Router();
const {registrUser, authUser }= require("../controllers/userControllers");


router.route("/").post(registrUser);
router.route("/login").post(authUser);


module.exports =router;