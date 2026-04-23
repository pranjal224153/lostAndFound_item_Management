const express = require("express");
const Item = require("../models/Item");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// ADD ITEM
router.post("/items", auth, async (req, res) => {
  try {
    const newItem = new Item({
      ...req.body,
      user: req.user.id,
    });

    await newItem.save();
    res.json(newItem);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// GET ALL ITEMS
router.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// GET ITEM BY ID
router.get("/items/:id", async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json(item);
});

// UPDATE ITEM
router.put("/items/:id", auth, async (req, res) => {
  let item = await Item.findById(req.params.id);

  if (item.user.toString() !== req.user.id) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(item);
});

// DELETE ITEM
router.delete("/items/:id", auth, async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item.user.toString() !== req.user.id) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  await item.deleteOne();
  res.json({ msg: "Item deleted" });
});

// SEARCH
router.get("/items/search", async (req, res) => {
  const { name } = req.query;

  const items = await Item.find({
    itemName: { $regex: name, $options: "i" },
  });

  res.json(items);
});

module.exports = router;