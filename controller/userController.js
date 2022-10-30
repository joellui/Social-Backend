const userModel = require('../model/userModel')
var jwt = require('jsonwebtoken')

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const createUser = async (req,res)=>{
    try {
        const { email, password } = req.body

        const findUser = await userModel.findOne({ email: email })
        if (findUser) return res.json({ status: false, error: "email already registered" })

        req.body.password = password

        let userData = await userModel.create(req.body)
        res.status(201).json({ status: true, data: userData})

    } catch (err) {
        res.status(400).json({ status: false, error: err.message })
    }
}

const authenticateUser = async (req,res)=>{
    try{
        const {email, password} =req.body

        if (!emailRegex.test(email))return res.json({status: false, error: "enter a valid email"})
        const findUser = await userModel.findOne({email:email})
        console.log(findUser._id)

        if(!findUser) return res.status(400).json({status:false, error:"this email is not registered"})
        
        const passwordCheck = password === findUser.password
        if(!passwordCheck) return res.json({status:false, error:"enter a valid password"})

        const token = jwt.sign({userId: findUser._id},'secretKey')
        console.log("token : " + token)
        return res.status(200).json({stats: true, data: {token: token}})
    }catch(err){
        console.log(err)
        res.status(500).json({status: false, error: err.message})
    }
}

const userfollow = async(req,res)=>{
    try {

        const updateFollowers = await userModel.findByIdAndUpdate(req.params.id, {$push:{followers:req.userId}},{new:true})
        
        const updateFollowing = await userModel.findByIdAndUpdate(req.userId,  {$push:{following:req.params.id}},{new:true})


        return res.status(200).json({ status: true, message:"follow sucessful"})
    } catch (error) {
        res.status(500).json({ status: false, error: error })
    }
}

const userunfollow = async(req,res)=>{
    try {
  
        const updateFollowers = await userModel.findByIdAndUpdate(req.params.id, {$pull:{followers:req.userId}},{new:true})
        
        const updateFollowing = await userModel.findByIdAndUpdate(req.userId,  {$pull:{following:req.params.id}},{new:true})

        return res.status(200).json({ status: true, message:"unfollow sucessful"})
    } catch (error) {
        res.status(500).json({ status: false, error: error })
    }
}

const user = async(req,res)=>{
    try{
        const user = await userModel.findById(req.userId)

        const out = {
            userName : user.name,
            followers : user.followers.length,
            following : user.following.length
        }

        res.status(200).json({status:true, data: out})
    }catch (err){
        res.status(500).json({status: false, error: err.message})
    }
}



module.exports = {createUser, user, authenticateUser, userfollow, userunfollow}