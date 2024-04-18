import { Request, Response } from 'express';
const express = require('express');
const api = express();
import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(() => {

    api.use(express.json());

    api.get("/", (req: Request, res: Response) => {
        return res.json('Its OK')
    })

    api.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    });
});