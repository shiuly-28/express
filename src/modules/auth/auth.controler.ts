import type { Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = async(req: Request, res:Response) =>{
try{
const result = await authService.loginUserIntDB(req.body)

     res.status(201).json({
    success:true,
    message: "Profile created successfully!",
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
    loginUser
}