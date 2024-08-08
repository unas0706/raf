import app from "./app.js";
import dotenv from "dotenv";
import connectDb from "./db/connectDb.js";

dotenv.config({
  path: "./.env",
});

connectDb()
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(process.env.PORT, () => {
  console.log("Server has Started");
});
