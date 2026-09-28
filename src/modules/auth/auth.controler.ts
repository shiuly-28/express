import type { Request, Response } from "express";
import { authService } from "./auth.service";


// register

const  registerUser = async(req: Request, res: Response) => {
    try{
        const result = await authService.createUserIntoDB(req.body)
          res.status(201).json({
    success:true,
    message: "User registered successfully!",
    data: result
     });
    }catch(error: any){
  res.status(400).json({
        success: false,
        message: error.message,
        error: error,
      })
    }
}


// loginUser
const loginUser = async(req: Request, res:Response) =>{
try{
const result = await authService.loginUserIntoDB(req.body)

     res.status(201).json({
    success:true,
    message: "User logged in successfully!",
    data: result
     });
     
}catch(error: any){
    res.status(401).json({
        success: false,
        message: error.message,
        error: error,
      })
}
}

export const authControler = {
    loginUser,
     registerUser
}