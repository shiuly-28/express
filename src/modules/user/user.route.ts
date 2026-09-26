import { Router } from "express";
import { userControler } from "./user.controler";


const router = Router()

router.post('/', userControler.createUser)
router.get('/', userControler.getAllUsers) 
router.get('/:id', userControler.getSingleUsers )
router.put("/:id",userControler.updatedUser)
router.delete("/:id", userControler.deleteUser)



export const userRoute = router;