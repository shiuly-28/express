import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from 'jsonwebtoken'
import config from '../../config';


// Rgister service

const createUserIntoDB = async(payload:{
    name: string;
    email: string;
    password: string;
    age?: number
}) =>{

    const {name, email, password} = payload;
    const userExist = await pool.query(
         `SELECT * FROM users WHERE email=$1
        `,
        [email]
    )
    if(userExist.rows.length > 0){
        throw new Error("User already exists with this email!")
    }
    // haspassword
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert into DB
    const newUser = await pool.query(
        `INSERT INTO users (name, email, password) 
         VALUES ($1, $2, $3) 
         RETURNING id, name, email, is_active`,
        [name, email, hashedPassword]
    );
    return newUser.rows[0]
}
// login
const loginUserIntoDB = async(payload: {
    email: string;
    password:string
})=>{
    const {email, password} = payload;

    const userData = await pool.query(
        `SELECT * FROM users WHERE email=$1
        `,
        [email]
    );
    if(userData.rows.length === 0){
        throw new Error("Invalid Credentials!")
    }

    const user = userData.rows[0];
   
    const matchPassword = await bcrypt.compare(password, user.password)
    console.log(matchPassword)

    if(!matchPassword){
        throw new Error("Invalid Credentials!")
    }

    // Generte token
    const JwtPayload = {
        id: user.id,
        name: user.name,
        is_active: user.is_active,
        email:user.email,
    }

    const accessToken = jwt.sign(JwtPayload, config.secret as string,{
        expiresIn: "1d"
    })
    return {accessToken};
}

export const authService = {
   loginUserIntoDB,
   createUserIntoDB
}