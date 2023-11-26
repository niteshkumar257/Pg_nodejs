import connection from "../Db/db.js";
import bcrypt from "bcrypt";

import { v4 as uuidv4 } from "uuid";

const myPlaintextPassword = "password";
    const saltRounds = 10;

const login = async (req, res) => {
  try {
    

    const hashedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds);
  
    res.status(200).json({
      success: true,
      hashedPassword: hashedPassword,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email)
      return res.json({
        success: 0,
        error: "Please provide email id",
      });
    if (!password) {
      return res.json({
        success: 0,
        error: "Please Provide a password",
      });
    }
    const teacer_jd = uuidv4();
    const userExit = await connection.query(
      `select email from teacher where email=$1`,
      [email]
    );
  
    if (userExit.rows.length !== 0) {
      return res.status(400).json({
        success: 0,
        message: "User already exits",
      });
    } else {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
      const queryText = `insert into teacher(teacher_id,email,passwords) values($1,$2,$3)`;
      const queryParams = [teacer_jd, email, hashedPassword];
      const newTeacher = await connection.query(queryText, queryParams);
      return res.status(200).json({
        success: true,
        message: "User created",
      });
    }
  } catch (err) {
    return res.json({
      success: 0,
      message: "Something went wrong",
    });
  }
};
export { login, register };
