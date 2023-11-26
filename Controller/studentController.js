import connection from "../Db/db.js";
import { v4 as uuidv4 } from "uuid";
import { uploadToCloudinary } from "../utils/uploadFile.js";
const addStudent = (req, res) => {
  const { student_name, school_id, age } = req.body;

  console.log(req.body);

  if (!student_name || !school_id || !age) {
    return res.status(404).json({ error: "All fields are required" });
  }

  try {
    const student_id = uuidv4();

    console.log(student_id);
    const addStudent =
      "INSERT INTO student (student_id, student_name, school_id, age) VALUES ($1, $2, $3, $4)";

    console.log(addStudent);
    connection.query(
      addStudent,
      [student_id, student_name, school_id, age],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            success: 0,
            error: err,
          });
        } else {
          return res.status(200).json({
            success: 1,
            message: "Student added",
          });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};
const getStudentInfo = async (req, res) => {
  const { student_id, school_id, student_name, age } = req.query;

  try {
    let queryText = "SELECT * FROM student WHERE true";

    const queryParams = [];

    if (student_id !== undefined) {
      queryText += " AND student_id = $1";
      queryParams.push(student_id);
    }

    if (student_name !== undefined) {
      queryText += " AND student_name = $" + (queryParams.length + 1);
      queryParams.push(student_name);
    }

    if (school_id !== undefined) {
      queryText += " AND school_id = $" + (queryParams.length + 1);
      queryParams.push(school_id);
    }
    if (age !== undefined) {
      queryText += " AND age < $" + (queryParams.length + 1);
      queryParams.push(age);
    }

    queryText += " Order by student_name desc";
    const studentList = await connection.query(queryText, queryParams);

    return res.status(200).json({
      success: true,
      allStudents: studentList.rows,
      message: "Students found",
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const updateStudent = async (req, res) => {
  const { student_id } = req.params;
  const { student_name } = req.body;
  try {
    if (!student_id)
      return res.status(404).json({
        success: false,
        message: "Student is not found",
      });
    if (!student_name) {
      return res.status(404).json({
        success: false,
        message: "studnet_name is not given",
      });
    }
    let queryText = "Update student ";
    let queryParams = [];
    queryText += " set student_name=$1 where student_id=$2";
    queryParams.push(student_name);
    queryParams.push(student_id);
    console.log(queryText);

    connection.query(queryText, queryParams, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          meesage: err,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "student name updated succefully",
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const updateStudentImage = async (req, res) => {
  const { student_id } = req.params;
  console.log(req.file);

  try {
    const { path } = req.file;

    const student_image_url = await uploadToCloudinary({
      localImagepath: path,
    });

    let queryText = "UPDATE student SET student_image=$1 WHERE student_id=$2";
    let queryParmas = [student_image_url, student_id];

    connection.query(queryText, queryParmas, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Student image updated successfully",
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export { addStudent, getStudentInfo, updateStudent, updateStudentImage };
