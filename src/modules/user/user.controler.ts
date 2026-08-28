import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";

const createUser = async(req: Request, res: Response) => {
  // console.log(req.body)
  const {name, email, password, age} = req.body;
  try{
    const result = await userService.createUserIntroDB(req.body);
    // console.log(result)
  res.status(201).json({
      success: false,
    message: "User Created Successfully!",
    data:result.rows[0]
  })
  }catch(error : any){
     res.status(500).json({
    success: false,
    message: error.message,
    error:error
    
  })
  }
}

export const userControler = {
createUser
}