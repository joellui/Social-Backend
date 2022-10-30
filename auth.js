const jwt = require('jsonwebtoken')

const authenticate = (req,res,next)=>{
    try{
        const header = req.header("Authorization")
        if (!header) return res.json({ status: false, error: "token required" })

        let splitToken = header.split(" ")
        let token = splitToken[1]

        let decodedToken = jwt.verify(token, "secretKey")

        req.userId = decodedToken.userId
        

        next()
    }catch(error){
        res.json({status:false,error: error.message})
    }

}

module.exports = {authenticate}