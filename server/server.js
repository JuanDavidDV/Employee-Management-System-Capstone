import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();

app.listen(8080, () => {
    console.log(`Sever is running`)
})