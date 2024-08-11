import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import errorMiddleware from "./middlewares/error.middleware.js";
import router from "./routers/salon.router.js";

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
app.use(router);

app.use(errorMiddleware);

export default app;
