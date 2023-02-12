import express from "express";
import { db } from "../db.js";


const router = express.Router();

router.get("/gps_info", (req, res) => {
    const q = "SELECT * FROM gps";

    db.query(q, (err, data) => {
        if (err) return res.send(err);
        return res.status(200).json(data);
    })
});

router.get("/gps_details/:id", (req, res) => {
    const q = "SELECT * FROM gps WHERE DeviceID = ?";
    const deviceId = (req.params.id).substring(1);
   
    //console.log(deviceId);
    db.query(q, [deviceId], (err, data) => {
        if (err) return res.send(err);
        return res.status(200).json(data);
    })
});
export default router;