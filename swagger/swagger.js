import { version } from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "AguaMarina API",
            version: '1.0.0',
            description: 'API for AguaMarina',
            contact: {
                name: 'AguaMarina'
            }
        }
    }
}