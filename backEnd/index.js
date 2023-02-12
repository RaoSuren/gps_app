import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/backend/auth", authRoutes);
app.use("/backend/users", userRoutes);
/*
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "RootUser123@",
    database:"gps_data"
})

app.get("/", (req, res) => {
    res.json("hello this is the backend")
})

app.get("/books", (req, res) => {
    const q = "SELECT * FROM gps"
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`DeviceID`,`Device Type`,`TimeStamp`,`location`) VALUES (?)"
    const values = [
        "fron backebd",
        "fron backend",
        "2022-01-21 10:30:10",
        "fron backend"
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})*/

app.listen(8800, () => {
    console.log("connencted to backend!");
})