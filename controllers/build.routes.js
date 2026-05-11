const router = require('express').Router()
const Build = require('../models/Build')
const verifyToken = require('../middleware/verify-token')

router.post('/', verifyToken ,async (req,res)=>{
    try{
        console.log(req.user)
        req.body.User = req.user._id
        const createdBuild = await Build.create(req.body)
        res.status(201).json(createdBuild)

    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/', async (req,res)=>{
    try{
        const allBuilds = await Build.find().populate('title')
        res.json(allBuilds)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)

    }
})


