const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');
const fs = require('fs');
const path = require('path');

// Read and parse the OpenAPI YAML file
const openAPIPath = path.join(__dirname, 'openapi.yaml');
const openAPIFile = fs.readFileSync(openAPIPath, 'utf8');
const swaggerSpec = YAML.parse(openAPIFile);

module.exports = swaggerSpec;
