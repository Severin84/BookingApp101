const express=require('express');
const router=express.Router();

const AdminController=require("../controllers/Admin.js");
const {createJob, getJob, scrap} = require('../controllers/Jobs.js');

router.post("/login",AdminController.getAdminData)
// router.post("/job",createJob)
//router.route("/job").post(createJob);
// function check(){
//     console.log("Fuck")
//   }
router.get("/allJobs",getJob)
// router.post("/job",createJob)
// router.post("/job",scrap)
router.route("/job").post(scrap)
// router.route("/job").post(createJob)


module.exports=router
