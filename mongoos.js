require('dotenv').config()
const mongoos = require("mongoose")

mongoos.connect(process.env.DATABASE_URL)

const db = mongoos.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))