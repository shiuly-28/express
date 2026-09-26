import { Router } from "express";
import { productControler } from "./product.controler";

const router =  Router()

router.post('/', productControler.createProduct)


export const productRouter = router