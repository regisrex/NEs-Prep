import express from "express";
import baseRouter from './router';
import { env } from "./utils/env";
import prisma from './utils/prisma';
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";
async function bootStrap() {
    const app = express()
    app.use(notFound)
    app.use(errorHandler)
    app.use("/api/v1/", baseRouter)
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
        // deleteSwagger()
        // server.close((err) => {
        //     if (err) console.error(err.message)
        //     console.log("Server stopped running")
        // })
    }

    return {
        app,
        killServer
    }
}

export default bootStrap