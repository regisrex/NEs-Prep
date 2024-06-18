import fs from 'fs'
import swaggerAutoGen from 'swagger-autogen'
import { env } from './src/utils/env'
const doc = {
  info: {
    title: 'NE',
    description: 'Endpoints for NE'
  },
  servers: [
    {
      url: 'http://localhost:3030',
      description: ''       // by default: ''
    },
    // { ... }
  ],
  tags: [
    {
      name: "Auth",
      descrption: "Authentication endpoints"
    },
    {
      name: "Students",
      descrption: "Students endpoints"
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    },
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

swaggerAutoGen({ openapi: '3.0.0' })(outputFile, routes, doc)
