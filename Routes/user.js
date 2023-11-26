import express from "express";
import { login,register } from "../Controller/userController.js";

const router=express.Router();

router.post('/login',login);
router.post('/register',register)

export default router;