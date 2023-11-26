import express from "express";
const router=express.Router();
import { addStudent,getStudentInfo,updateStudent } from "../Controller/studentController.js";

router.post('/addStudent',addStudent);
router.get('/studentInfo',getStudentInfo);
router.patch('/updateStudent/:student_id',updateStudent);


export default router;