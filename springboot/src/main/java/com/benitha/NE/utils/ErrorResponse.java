package com.benitha.NE.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {

    private int statucCode;
    private String message;


    public ErrorResponse(String message){
        super();
        this.message   = message;
    }

}
