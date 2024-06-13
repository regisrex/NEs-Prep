import { Router } from "express";
import { readFileSync } from "fs";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger/swagger.json';
import middlewares from "./middlewares";
import { authMiddleware } from "./middlewares/authMiddleware";
import { authModule, clientsModule, invoicesModule } from "./modules";

const router = Router()
const customCss = readFileSync('swagger.css', 'utf8')

// app modules
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customCss }))
router.use('/auth', authModule)
router.use('*', authMiddleware)
router.use('/clients', clientsModule)
router.use('/invoices', invoicesModule)

// swagger api setup


router.use(middlewares.notFound)
router.use(middlewares.errorHandler)

export default router