// Write your "actions" router here!

const express = require("express");

const Actions = require("./actions-model");

const Projects = require("../projects/projects-model");

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

router.post("/", (req, res) => {
  const requiredFields = ["description", "notes", "project_id"];
  const missing = requiredFields.filter((field) => !req.body[field]);

  if (missing.length) {
    res.status(400);
  }

  Projects.get(req.body.project_id).then((project) => {
    if (!project) {
      res.status(404).json({ message: "project not found" });
    } else {
      Actions.insert(req.body)
        .then((action) => {
          if (action) {
            res.status(201).json(action);
          } else {
            res.status(404).json([]);
          }
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    }
  });
});

router.put("/:id", (req, res) => {
  const requiredFields = ["description", "notes", "project_id"];
  const missing = requiredFields.filter((field) => !req.body[field]);

  if (missing.length) {
    res.status(400);
  }

  Projects.get(req.body.project_id).then((project) => {
    if (!project) {
      res.status(404).json({ message: "project not found" });
    } else {
      Actions.update(req.params.id, req.body)
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
    }
  });
});

router.delete("/:id", (req, res) => {
  Actions.remove(req.params.id)
    .then((action) => {
      if (action) {
        res.status(200);
      } else {
        res.status(404).json({ message: "action not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
