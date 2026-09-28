import { Router } from "express";
import { authControler } from "./auth.controler";

const router = Router()

router.post("/register", authControler.registerUser)
router.post("/login", authControler.loginUser)

export const authRoute = router;
