const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");


router.get("/", authorization, async (req, res) => {
    try {

        const user = await pool.query("SELECT user_name FROM USERS WHERE roll_no= $1", [req.user])
        // res.json(req.user);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server Error");

    }
}


);

module.exports = router;

