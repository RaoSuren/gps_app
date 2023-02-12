import express from "express";
import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", (req, res) => {
    // Check Existing user
    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.json(err);
        if (data.length) return res.status(409).json("User already exists!");

        // Hash password and create the user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users(`username`,`password`) VALUES (?)"
        const values = [
            req.body.username,
            hash,
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("User has been created.");
        });
    });
});
router.post("/login", (req, res) => {
    //Check if user exists
    const q = "SELECT * FROM users WHERE username = ?"

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.json(err);
        if (data.length == 0) return res.status(404).json("User not found!");

        // Check Password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

        if (!isPasswordCorrect) return res.status(400).json("Wrong username or password!");
        const { password, ...other } = data[0];
        const token = jwt.sign({ id: data[0].id }, "jwtkey");
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(other);
        //return res.status(200).json("Login Sucessful!");

    });
});
router.post("/logout", (req, res) => {

    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logout.");
});

export default router;