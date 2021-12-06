// Route index.js
// Import
const router = require("express").Router()

const home = require('./../controllers')

// Routes
router.get('/', home)

// Export
module.exports = router