const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDocs = {
  webSpec: {
    openapi: '3.0.0',
    info: {
      title: 'Patient Doctor API Development',
      version: '1.0.0',
      description:
        'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
    },
    basePath: '/api/v1',
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    servers: [
      {
        url: `${process.env.BACKEND_URL}/api/v1`,
        description: 'Development server',
      },
    ],
  },
};

const webMobileOptions = {
  swaggerDefinition: swaggerDocs.webSpec,
  apis: ['api-docs/v1/web-mobile/*.yaml'],
};
module.exports.webMobileSetup = swaggerJSDoc(webMobileOptions);
