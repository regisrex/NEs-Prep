import bootStrap from "./src/api";

import './utils/email/email'; // for email setup
/**
 * bootStrap the app
 */


bootStrap().then(({ app, killServer }) => {
    process.on('SIGINT', () => {
        killServer()
    })
})

