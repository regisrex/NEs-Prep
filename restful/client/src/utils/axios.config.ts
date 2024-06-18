import _ from "axios";
export const axios = _.create({
    baseURL: "http://localhost:3030/api/v1",
    headers: {
        'Content-Type': 'application/json',
    }

})