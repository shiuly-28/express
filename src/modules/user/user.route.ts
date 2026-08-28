import { Router } from "express";
import { userControler } from "./user.controler";


const router = Router()

router.post('/', userControler.createUser)

export const userRoute = router;