const router = require("express").Router();
const pool = require("../db")
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validinfo = require("../middleware/validinfo");
const authorization = require("../middleware/authorization");

router.post("/register", validinfo, async (req, res) => {
    try {

        //1
        const { rollno, name, email, password } = req.body;
        //2
        const users = await pool.query('SELECT * FROM "users" WHERE email_id = $1', [
            email
        ]);

        //res.json(user.rows)
        if (users.rows.length !== 0) {
            return res.status(401).send("user already exsist")
        }
        //3
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        //4

        const newUser = await pool.query('INSERT INTO "users" VALUES($1,$2,$3,$4) RETURNING *', [rollno, name, email, bcryptPassword])

        res.json(newUser.rows[0])
        //5

        const token = jwtGenerator(newUser.rows[0].roll_no);

        res.json({ token });

    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error re")

    }
});

router.post("/login", validinfo, async (req, res) => {

    try {
        //1
        const { rollno, password } = req.body;
        //2
        const user = await pool.query("SELECT * FROM users WHERE roll_no = $1", [
            rollno
        ]);

        if (user.rows.length === 0) {
            return res.status(401).send("Roll number or Email Incorrect");

        }
        //3

        const validPassword = await bcrypt.compare(password, user.rows[0].pass_word);

        //console.log(validPassword);
        if (!validPassword) {
            return res.status.json("Password or Roll Number Incorrect");
        }

        //4

        const token = jwtGenerator(user.rows[0].roll_no);

        res.json({ token });

    } catch (err) {
        console.error(err.message)
        res.status(500).send("server errorr")

    }

});

router.get("/is-verify", authorization, async (req, res) => {
    try {
        console.log("hahaha");
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error verify");
    }
});

module.exports = router;