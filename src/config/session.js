// Imports
const session = require('express-session')
const MongoStore = require('connect-mongo')

// Function
const sessionM = (app) => {
    // Seguridad y flexibilidad con servidores externos heroku
    app.set('trust proxy', 1)
    // Insert Session
    app.use(session({
        secret: process.env.SECRET_WORD,
        resave: true,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60
        },
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB
        })
    }))
}

// Export
module.exports = sessionM