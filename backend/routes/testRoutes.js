const express = require("express");
const router =express.Router();
const {getTests, createTest, getTestById, updateTest,deleteTest} = require("../controllers/testControllers");
const {protect} =require("../middlewares/authMiddleware")

router.route("/").get(getTests);
router.route("/create").post(protect,createTest);
router.route("/:id").get(getTestById).put(protect,updateTest).delete(protect, deleteTest);

module.exports = router;

