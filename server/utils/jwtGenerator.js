const jwt = require("jsonwebtoken");
require("dotenv").config();


function jwtGenerator(roll_no){
const payload = {
    rollno : roll_no
};

return jwt.sign(payload,process.env.jwtSecret,{expiresIn:"1hr"})
}

module.exports = jwtGenerator;