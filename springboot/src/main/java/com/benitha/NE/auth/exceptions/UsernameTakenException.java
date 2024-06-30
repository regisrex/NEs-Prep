package com.benitha.NE.auth.exceptions;

public class UsernameTakenException extends RuntimeException {
    private String message;

    public UsernameTakenException(String message){
        super(message);
        this.message = message != null ? message :  "Username taken";

    }

}
