const mongoos = require('mongoose')
const ObjectId = mongoos.Schema.Types.ObjectId

const userSchema = new mongoos.Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    following:[{
        type:ObjectId,
        ref:"User"
    }],
    followers:[{
        type:ObjectId,
        ref:"User"
    }]
},{timestamps:true})

module.exports = mongoos.model("User",userSchema)