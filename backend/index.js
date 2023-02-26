const express = require("express");
const connectToMongo = require("./db");
const dotenv = require('dotenv');
dotenv.config();
connectToMongo();

const app = express();
var cors = require('cors')
const port = 5000;

app.use(express.json());// it supports the json parsing of the data
app.use(cors());// cors-policy

app.get("/", (req, res) => {
    res.send("Hello world, a try to make own MERN application");
})


app.use("/todo/api/auth", require("./routes/auth"))
app.use("/todo/api/todo", require("./routes/todos"))

app.listen(port, () => {
    console.log(`backend listening on port ${port}`);
    console.log("Variable", process.env.RJWT)
})
