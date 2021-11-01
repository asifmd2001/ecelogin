const jwt = require("jsonwebtoken");
require("dotenv").config();

// module.exports = async (req, res, next) => {
//   try {
//     const jwtToken =  req.header("token");
//     if (!jwtToken) {
//       return res.status(403).json("Not Authorized");
//     }
//     const payload = jwt.verify(jwtToken, process.env.jwtSecret);
//     req.user = payload.user;

//   } catch (err) {
//     console.error(err.message);
//     return res.status(403).json("Not Authorized");

//   }
// };

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("jwt_token");

  // Check if not token
  if (!token) {
    return res.status(403).json({ msg: "authorization denied" });
  }

  // Verify token
  try {
    //it is going to give use the user id (user:{id: user.id})
    const verify = jwt.verify(token, process.env.jwtSecret);
    console.log(verify.rollno);
    req.user = verify.rollno;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};