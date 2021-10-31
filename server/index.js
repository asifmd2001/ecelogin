//C:\Program Files\PostgreSQL\14\bin

const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json())
app.use(cors());


app.use('/auth', require("./routes/jwtAuth"));
app.listen(5000,()=>{
console.log("server is on")

});