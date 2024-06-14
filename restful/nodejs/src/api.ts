import express, { json } from "express";
import appRouter from "./router";
import { env } from "./utils/env";
import prisma from './utils/prisma';
import morgan = require("morgan");

async function bootStrap() {
    const app = express()
    app.use(json())
    app.use(morgan("common"))
    app.use("/api/v2", appRouter)

    await prisma.$connect()
    console.log("Pg :: Database connected ")
    const server = app.listen(env.PORT, () => {
        console.log(`Server running on port ${env.PORT}`)
    })

    function killServer() {
        prisma.$disconnect()
            .then(() => {
                console.log("Database disconnected")
            })

        server.close((err) => {
            if (err) console.error(err.message)
            console.log("Server stopped running")
        })
    }


    return {
        app,
        killServer
    }
}

export default bootStrap