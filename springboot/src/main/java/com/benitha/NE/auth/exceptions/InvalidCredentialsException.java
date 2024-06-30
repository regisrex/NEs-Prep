package com.benitha.NE.auth.exceptions;

public class InvalidCredentialsException extends RuntimeException {
    private String message;

    public InvalidCredentialsException(String message){
        super(message);
        this.message = message != null ? message :  "Invalid credentials";

    }

}