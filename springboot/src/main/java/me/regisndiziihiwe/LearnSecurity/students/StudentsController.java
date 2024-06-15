package me.regisndiziihiwe.LearnSecurity.students;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import me.regisndiziihiwe.LearnSecurity.models.Student;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/students")
public class StudentsController {

    @GetMapping
    public ResponseEntity<List<Student>> getStudents(){
        return  ResponseEntity.ok(
            List.of(
                new Student("474858858-599555-939993--59999599","NDIZIHIWE Regis", 16)
            )
        );
    }

}
