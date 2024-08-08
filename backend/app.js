import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import router from "./routers/adminRouter.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

//custom middlewares
app.use("api/v1/users", router);
app.use(errorMiddleware);

export default app;
