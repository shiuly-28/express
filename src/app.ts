
import express, { type Application,
   type Request,
    type Response
   } from "express";
import config from "./config";
import { initDB, pool } from "./db";
import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { productRouter } from "./modules/product/product.route";
import { authRoute } from "./modules/auth/auth.route";
import logger from "./middleware/logger";
import cookieParser from "cookie-parser";
import cors from "cors"


const app : Application = express()
// const port = config.port;

app.use(express.json())

app.use(express.text())
app.use(cookieParser());
app.use(express.urlencoded({extended : true}))

app.use(logger);

app.use(cors({
  origin: 'http://localhost:3000',
}))


app.use("/api/users", userRoute);
app.use("/api/profile", profileRoute);
app.use("/api/product", productRouter);
app.use("/api/auth", authRoute)


app.get('/', (req: Request, res: Response) => {
  // res.send('Hello World!!')
  res.status(200).json({
    "message" : "Express Server",
    "author" : "Next Level"
  })
})

export default app;