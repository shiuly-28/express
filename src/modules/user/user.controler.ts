import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    // req.body না থাকলে আগে থামিয়ে দিবে
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body cannot be empty",
      });
    }

    const { name, email, password, age } = req.body;
    const result = await userService.createUserIntroDB(req.body);

    return res.status(201).json({
      success: true,
      message: "User Created Successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
const getAllUsers = async(req:Request, res: Response)=>{
  console.log(req.user)
  try{
    const result = await userService.getAllUsersFromDB();

      res.status(200).json({
        success: true,
        message: "Users retrived Successfully!",
        data: result.rows,
      })
  }catch(error: any){
     res.status(500).json({
        success: false,
        message: error.message,
        error: error,
      })
  }
}


const getSingleUsers = async(req: Request, res: Response) => {
  const {id} = req.params;
try{
const result = await userService.getSingleUserFromDB(id as string)

if(result.rows.length === 0){
  return res.status(404).json({
      success: false,
    message: "User not found",
    data:result.rows[0]
  })
}
// console.log(result)
res.status(200).json({
    success: true,
    message: "User retried Successfully!",
    data:result.rows[0]
  })

}catch(error: any){
res.status(500).json({
        success: false,
        message: error.message,
        error: error,
      })
}
}

const updatedUser =  async(req: Request, res:Response) =>{
 try{
   const {id} = req.params;

  // console.log("id : ", id)
  // console.log({name, password, age, is_active})

 const result = await userService.updatedUserFromDB(req.body, id as string)
 
  if(result.rows.length === 0){
    return res.status(404).json({
      success: false,
    message: "User not found",
    data:result.rows[0]
  })
  }
res.status(200).json({
    success: true,
    message: "User retried Successfully!",
    data:result.rows[0]
  })
 }catch(error : any){
res.status(500).json({
        success: false,
        message: error.message,
        error: error,
      })

 }

}

const deleteUser =  async(req: Request, res: Response) => {
  const {id} = req.params

  
  try{
    const result = await userService.deleteUserFromDB(id as string)
    if(result.rowCount === 0){
        return res.status(404).json({
      success: false,
    message: "User not found",
    data:result.rows[0]
  })
    }
    res.status(200).json({
    success: true,
    message: "User delete Successfully!",
    data:{},
  })

  }catch(error: any){
    res.status(500).json({
        success: false,
        message: error.message,
        error: error,
      })
  }
}
export const userControler = {
createUser, getAllUsers, getSingleUsers,
updatedUser,
deleteUser
}