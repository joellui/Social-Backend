const express = require("express")
const app = express()

require("./mongoos")

app.use(express.json())

const apiRouter =  require('./router/router')
app.use('/api',apiRouter)

app.listen(3000, ()=>{
    console.log('Server Started')
})