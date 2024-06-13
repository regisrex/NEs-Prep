import { Router } from "express";
import * as invoicesService from './service';
const router  = Router()

router.post('/', invoicesService.createInvoice)
router.get('/', invoicesService.getAllInvoices)
router.get('/:id', invoicesService.getInvoiceById)
router.get('/client/:clientId', invoicesService.getInvoicesByClient)
router.put('/:id', invoicesService.updateInvoice)
router.put('/set-as-paid/:id', invoicesService.setInvoiceAsPaid)
router.delete('/:id', invoicesService.deleteInvoice)

export default router