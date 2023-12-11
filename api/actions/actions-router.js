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
      res.status(500).send();
    });
});

router.get("/:id", (req, res) => {
  Actions.get(req.params.id)
    .then((action) => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).send();
      }
    })
    .catch((err) => {
      res.status(500).send();
    });
});

router.post("/", (req, res, next) => {
  const requiredFields = ["description", "notes", "project_id"];
  const missing = requiredFields.filter((field) => !req.body[field]);

  if (missing.length) {
    res.status(400).send();
  }

  Projects.get(req.body.project_id).then((project) => {
    if (!project) {
      res.status(404).send();
      next();
    } else {
      Actions.insert(req.body)
        .then((action) => {
          if (action) {
            res.status(201).json(action);
          } else {
            res.status(404).send();
          }
        })
        .catch((err) => {
          res.status(500).send();
        });
    }
  });
});

router.put("/:id", (req, res, next) => {
  const requiredFields = ["description", "notes", "project_id"];
  const missing = requiredFields.filter((field) => !req.body[field]);

  if (missing.length) {
    res.status(400).send();
  }

  Projects.get(req.body.project_id).then((project) => {
    if (!project) {
      res.status(404).send();
      next();
    } else {
      Actions.update(req.params.id, req.body)
        .then((action) => {
          if (action) {
            res.status(200).json(action);
          } else {
            res.status(404).send();
          }
        })
        .catch((err) => {
          res.status(500).send();
        });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Actions.remove(req.params.id)
    .then((action) => {
      if (!action) {
        res.status(404).send();
        next();
      } else {
        res.status(200).send();
        next();
      }
    })
    .catch((err) => {
      res.status(500).send();
    });
});

module.exports = router;
