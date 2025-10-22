import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import { onRequest } from "firebase-functions/v2/https";
import fetch from "node-fetch"; 

const app = express();
app.use(cors({ origin: true }));

app.get("/geocode", async (req, res) => {
    try {
        const apiKey = process.env.API_KEY;
        const address = req.query.address;
        if (!address) {
            return res.status(400).json({error: "Address parameter is required"});
        }

        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
        );

        const data = await result.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Something went wrong"}); 
    }
});

export const geocode = onRequest(app);