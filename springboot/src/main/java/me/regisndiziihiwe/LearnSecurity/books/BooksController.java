package me.regisndiziihiwe.LearnSecurity.books;

import io.swagger.v3.oas.annotations.Hidden;
import me.regisndiziihiwe.LearnSecurity.models.Book;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/books")
@Hidden
public class BooksController {


    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<Book>> getBooks() {
        return ResponseEntity.ok(List.of(new Book("32232", "232323", "2343242", "dfssdsd", "sdfsdfsf", 2024)));
    }
}

