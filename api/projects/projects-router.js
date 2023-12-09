// Write your "projects" router here!
const express = require("express");

const Projects = require("./projects-model");

const router = express.Router();

router.get("/", (req, res) => {
  Projects.get()
    .then((projects) => {
      if (projects) {
        res.status(200).json(projects);
      } else {
        res.status(404).json([]);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/:id", (req, res) => {
  Projects.get(req.params.id)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.post("/", (req, res) => {
  const requiredFields = ["name", "description"];
  const missing = requiredFields.filter((field) => !req.body[field]);

  if (missing.length) {
    res.status(400);
  }

  Projects.insert(req.body)
    .then((project) => {
      if (project) {
        res.status(201).json(project);
      } else {
        res.status(404);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.put("/:id", (req, res) => {
  const requiredFields = ["name", "description"];
  const missing = requiredFields.filter((field) => !req.body[field]);

  if (missing.length) {
    res.status(400);
  }

  Projects.update(req.params.id, req.body)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
