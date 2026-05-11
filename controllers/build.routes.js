const router = require('express').Router()
const Build = require('../models/Build')
const verifyToken = require('../middleware/verify-token')


// buuild create
router.post('/', verifyToken ,async (req,res)=>{
    try{
        console.log(req.user)
        req.body.User = req.user._id
        const createdBuild = await Build.create(req.body)
        res.status(201).json(createdBuild)

    }
    catch(err){
        console.log(err)
        res.status(500).json({ err: err.message });

    }
})
// all build get
router.get('/', async (req,res)=>{
    try{
        const allBuilds = await Build.find().populate('title')
        res.json(allBuilds)
    }
    catch(err){
        console.log(err)
        res.status(500).json({ err: err.message });


    }
})

// get one build
router.get("/:id", async (req, res) => {
  try {
    const oneBuild = await oneBuild.findById(req.params.id);

    if (!oneBuild) {
      return res.status(404).json({ err: "Build not found" });
    }

    res.status(200).json({ oneBuild });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});






module.exports = router