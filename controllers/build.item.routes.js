const router = require("express").Router();
const BuildItem = require("../models/BuildItem");
const verifyToken = require("../middleware/verify-token");

// build item create
router.post("/", verifyToken, async (req, res) => {
  try {
    console.log(req.user);
    req.body.User = req.user._id;
    const createdItem = await BuildItem.create(req.body);
    res.status(201).json(createdItem);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});
// all build item get
router.get("/", verifyToken, async (req, res) => {
  try {
    const allItem = await BuildItem.find().populate("title");
    res.json(allItem);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

// get one Item
router.get("/:id",verifyToken, async (req, res) => {
  try {
    const oneItem = await oneItem.findById(req.params.id);

    if (!oneItem) {
      return res.status(404).json({ err: "Build not found" });
    }

    res.status(200).json({ oneItem });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

// PUT /item/:id
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedItem = await BuildItem.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      {
        title: req.body.title,
        category: req.body.category,
        status: req.body.status,
        cost: req.body.cost,
        notes: req.body.notes,

      },
      { new: true, runValidators: true },
    );

    if (!updatedItem) {
      return res.status(404).json({ err: "Item not found" });
    }

    res.status(200).json({ Build: updatedItem });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

// DELETE /Builds/:id
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedItem = await BuildItem.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deletedItem) {
      return res.status(404).json({ err: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
