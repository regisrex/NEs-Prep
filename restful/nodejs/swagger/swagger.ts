import swaggerAutoGen from 'swagger-autogen'
import { env } from '../src/utils/env'
const doc = {
  info: {
    title: 'NE @V1',
    description: 'Endpoints for Bubbo'
  },
  servers: [
    {
      url: 'http://localhost:3030',
      description: ''       // by default: ''
    },
    // { ... }
  ],
  components: {
    schemas: {
      CreateAdminDto: {
        fullNames: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      },
      LoginDto: {
        identifier: '',
        password: ''
      },
      CreateClientDto: {
        phone: '',
        companyName: '',
        representative: '',
        tin: '',
        account: '',
        room: '',
        email: '',
        caution: '',
        m2: '',
        startDate: '',
        endDate: '',
        amount: '',
      },
      UpdateClientDto: {
        phone: '',
        companyName: '',
        representative: '',
        tin: '',
        account: '',
        room: '',
        email: '',
        caution: '',
        m2: '',
        startDate: '',
        endDate: '',
        amount: '',
      }
    }
  },
  host: `http://localhost:${env.PORT}/api/v1`
}

const outputFile = './swagger.json'
const routes = ['./src/router.ts']  

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutoGen({ openapi: '3.0.0' })(outputFile, routes, doc)
