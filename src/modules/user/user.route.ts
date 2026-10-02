import { Router } from "express";
import { userControler } from "./user.controler";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../types";


const router = Router()



router.post('/', userControler.createUser)
router.get('/',auth(USER_ROLE.admin, USER_ROLE.agent, USER_ROLE.user), userControler.getAllUsers) 
router.get('/:id', userControler.getSingleUsers )
router.put("/:id",userControler.updatedUser)
router.delete("/:id", userControler.deleteUser)



export const userRoute = router;