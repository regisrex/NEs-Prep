import { Router } from "express";
import { readFileSync } from "fs";
import swaggerUi from 'swagger-ui-express';
import middlewares from "./middlewares";
import { authMiddleware } from "./middlewares/authMiddleware";
import { authModule, clientsModule } from "./modules";
import swaggerDocument from './../swagger.json';
import { json } from 'express'
import morgan from "morgan";
import cors from 'cors';

const router = Router()

// Global middlewares
router.use(json())
router.options("*", cors())
router.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['http://localhost:5173']);
    res.status(200)
//     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.append('Access-Control-Allow-Headers', ['Content-Type','Authorization']);
    next();
});
router.use(morgan("common"))
// app modules
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
router.use('/auth', authModule
    /*
        #swagger.tags = ['Auth']
             #swagger.security = [{
                "bearerAuth": []
             }] 
    */
)

router.use('*', authMiddleware)
router.use('/students', clientsModule
    /*
    #swagger.tags = ['Students']
         #swagger.security = [{
            "bearerAuth": []
         }] 
*/
)

export default router