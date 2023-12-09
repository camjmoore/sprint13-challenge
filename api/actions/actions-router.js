// Write your "actions" router here!

const express = require("express");

const Actions = require("./actions-model");

const router = express.Router();

router.get("/", (req, res) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/:id", (req, res) => {
  Actions.get(req.params.id)
    .then((action) => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json([]);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
