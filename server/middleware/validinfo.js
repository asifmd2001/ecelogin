module.exports = (req, res, next)=> {
    const {rollno, email, name, password } = req.body;
  
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
    function validRollno(rollNO)
    {
        if(rollNO.length==7){
            return true;
        }else
        {
            return false;
        }
    }
  
    if (req.path === "/register") {
     // console.log(!email.length);
      if (![rollno,email, name, password].every(Boolean)) {
          //401-unathunticated
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.status(401).json("Invalid Email");
      }
    } else if (req.path === "/login") {
      if (![rollno, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validRollno(rollno)) {
        return  res.status(401).json("Invalid Rollno");
      }
    }
  
    next();
  };