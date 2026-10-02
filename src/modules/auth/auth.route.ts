import { Router } from "express";
import { authControler } from "./auth.controler";

const router = Router()

router.post("/register", authControler.registerUser)
router.post("/login", authControler.loginUser)
router.post("/refresh-token", authControler.refreshToken)

export const authRoute = router;
