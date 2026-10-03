import type { Request, Response } from "express";
import { authService } from "./auth.service";


// register

const  registerUser = async(req: Request, res: Response) => {
    try{
        const result = await authService.createUserIntoDB(req.body)
        const {refreshToken} = result;

        res.cookie("refreshToken", refreshToken, {
          secure : false,
          httpOnly : true, 
          sameSite : 'lax'
        })
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
const { accessToken } = result;

res.cookie("refreshToken", result.refreshToken,{
  httpOnly:true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 24 * 60 * 60 * 1000,
})
     res.status(200).json({
    success:true,
    message: "User logged in successfully!",
    data: {
      accessToken: result.accessToken,
        refreshToken: result.refreshToken,
    }
     });
     
}catch(error: any){
    res.status(401).json({
        success: false,
        message: error.message || "Invalid credentials",
        error: error,
      })
}
}

// refresh token

const refreshToken = async(req: Request, res: Response) =>{
try{
const result = await authService.generateFreshToken(
  req.cookies.refreshToken
)

res.status(200).json({
    success:true,
    message: "Access token Generate",
    data: result
     });
     
}catch(error: any){
    res.status(401).json({
        success: false,
        message: error.message || "Invalid credentials",
        error: error,
      })
}
}

export const authControler = {
    loginUser,
     registerUser,
     refreshToken

}