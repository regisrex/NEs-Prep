import { Router } from "express";
import { readFileSync } from "fs";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger/swagger.json';
import middlewares from "./middlewares";
import { authMiddleware } from "./middlewares/authMiddleware";
import { authModule, clientsModule } from "./modules";

const router = Router()
const customCss = readFileSync('swagger.css', 'utf8')

// app modules
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customCss }))
router.use('/auth', authModule
    /*
        #swagger.tags = ['Auth']
             #swagger.security = [{
                "bearerAuth": []
             }] 
    */
)

router.use('*', authMiddleware)
router.use('/clients', clientsModule
    /*
    #swagger.tags = ['Clients']
         #swagger.security = [{
            "bearerAuth": []
         }] 
*/
)

// swagger documentation setup
router.use(middlewares.notFound)
router.use(middlewares.errorHandler)

export default router