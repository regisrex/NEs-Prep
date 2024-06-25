package me.regisndiziihiwe.LearnSecurity.utils;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse<T> {
    public boolean success ;
    public String message;
    public  T data;
}
