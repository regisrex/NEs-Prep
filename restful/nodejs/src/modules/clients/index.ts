import { Router } from "express";
import * as clientService from './service';
const router = Router();


router.get("/", clientService.getAllClients)
router.get("/:id", clientService.getClientById)
router.post('/', clientService.createClient)
router.put('/:id', clientService.updateClient)
router.delete('/:id', clientService.deleteClient)



export default router