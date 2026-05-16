const router = require("express").Router();
const Build = require("../models/Build");
const verifyToken = require("../middleware/verify-token");

// build create
router.post("/", verifyToken, async (req, res) => {
  try {
    console.log(req.user);
   req.body.owner = req.user._id;
const createdBuild = await Build.create(req.body);
    res.status(201).json(createdBuild);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});
// all build get
router.get("/", verifyToken, async (req, res) => {
  try {
    const allBuilds = await Build.find({ owner: req.user._id });
    res.json(allBuilds);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

// get one build
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const oneBuild = await Build.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!oneBuild) {
      return res.status(404).json({ err: "Build not found" });
    }

    res.status(200).json({ oneBuild });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

// PUT /Builds/:id
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedBuild = await Build.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      {
        title: req.body.title,
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        engine: req.body.engine,
        goal: req.body.goal,
        status: req.body.status,
        budget: req.body.budget,
        image: req.body.image,
      },
      { new: true, runValidators: true },
    );

    if (!updatedBuild) {
      return res.status(404).json({ err: "Build not found" });
    }

    res.status(200).json({ Build: updatedBuild });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

// DELETE /Builds/:id
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedBuild = await Build.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!deletedBuild) {
      return res.status(404).json({ err: "Build not found" });
    }

    res.status(200).json({ message: "Build deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
