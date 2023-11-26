import connection from "../Db/db.js";

const login=async(req,res)=>{

   res.status(200).json({
    success:true,
    message:"login route"
   })


}
const register=async(req,res)=>{
    res.status(200).json({
        success:true,
        message:"register route"
    })

}
export {login,register}