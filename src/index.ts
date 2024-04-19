const express = require('express');
const api = express();
const bodyParser = require('body-parser');
import { AppDataSource } from "./data-source";
import routes from './routes';

AppDataSource.initialize().then(() => {

    api.use(express.json())

    api.use(bodyParser.json());
    api.use(bodyParser.urlencoded({ extended: true }));

    api.use(routes);

    api.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
});