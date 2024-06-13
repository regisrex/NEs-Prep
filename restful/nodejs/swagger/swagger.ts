import swaggerAutoGen from 'swagger-autogen'

const doc = {
  info: {
    title: 'Bonbon-api @v1',
    description: 'Endpoints'
  },
  host: 'localhost:5000'
}

const outputFile = './swagger.json'
const routes = ['./router.ts']

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutoGen()(outputFile, routes, doc)
