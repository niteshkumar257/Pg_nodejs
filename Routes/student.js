import express from "express";
const router=express.Router();
import { upload } from "../middleware/multer.middlware.js";
import { addStudent,getStudentInfo,updateStudent,updateStudentImage } from "../Controller/studentController.js";



router.post('/addStudent',addStudent);
router.get('/studentInfo',getStudentInfo);
router.patch('/updateStudent/:student_id',updateStudent);
router.patch('/updateStudentImage/:student_id',upload.single('image'),updateStudentImage);


export default router;