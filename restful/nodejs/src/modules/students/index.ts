import { Router } from "express";
import * as studentService from './service';
const router = Router();


router.get("/", studentService.getStudents)
router.get("/:id", studentService.getStudentbyid)
router.post('/', studentService.createStudent)
router.put('/:id', studentService.updateClient)
router.delete('/:id', studentService.deleteStudent)



export default router