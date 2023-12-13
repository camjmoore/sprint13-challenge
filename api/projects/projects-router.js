// Write your "projects" router here!
const express = require('express');

const Projects = require('./projects-model');
const { validateProject } = require ('./projects-middleware');

const router = express.Router();

router.get('/', (req, res) => {
  Projects.get()
    .then((projects) => {
      if (projects) {
        res.status(200).json(projects);
      } else {
        res.status(404).json([]);
      }
    })
    .catch((err) => {
      res.status(500).end();
    });
});

router.get('/:id', (req, res) => {
  Projects.get(req.params.id)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).end();
    });
});

router.post('/', validateProject, (req, res) => {
  Projects.insert(req.body)
    .then((project) => {
      if (project) {
        res.status(201).json(project);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).end();
    });
});

router.put('/:id', validateProject, (req, res) => {
  Projects.update(req.params.id, req.body)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).end();
    });
});

router.delete('/:id', (req, res) => {
  Projects.remove(req.params.id)
    .then((project) => {
      if (project) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).end();
    });
});

router.get('/:id/actions', (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then((actions) => {
      if (actions) {
        res.status(200).json(actions);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).end();
    });
});

module.exports = router;
