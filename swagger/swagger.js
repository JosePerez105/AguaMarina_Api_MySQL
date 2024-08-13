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
            },
            servers: [
                {
                    url: 'http://localhost:3000',
                    description: 'Local server'
                }
            ]
        }
    },
    apis: ['../src/routes/*.js']
};

const specs = swaggerJSDoc(options)
export default specs;