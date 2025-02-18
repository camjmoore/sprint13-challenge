// Write your "actions" router here!

const express = require('express');

const Actions = require('./actions-model');

const Projects = require('../projects/projects-model');

const { validateAction } = require('./actions-middlware');

const router = express.Router();

router.get('/', (req, res) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      res.status(500).end();
    });
});

router.get('/:id', (req, res) => {
  Actions.get(req.params.id)
    .then((action) => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).end();
    });
});

router.post('/', validateAction, (req, res) => {
  Projects.get(req.body.project_id).then((project) => {
    if (!project) {
      res.status(404).end();
    } else {
      Actions.insert(req.body)
        .then((action) => {
          if (action) {
            res.status(201).json(action);
          } else {
            res.status(404).end();
          }
        })
        .catch((err) => {
          res.status(500).end();
        });
    }
  });
});

router.put('/:id', validateAction, (req, res) => {
  Projects.get(req.body.project_id).then((project) => {
    if (!project) {
      res.status(404).end();
    } else {
      Actions.update(req.params.id, req.body)
        .then((action) => {
          if (action) {
            res.status(200).json(action);
          } else {
            res.status(404).end();
          }
        })
        .catch((err) => {
          res.status(500).end();
        });
    }
  });
});

router.delete('/:id', (req, res) => {
  Actions.remove(req.params.id)
    .then((action) => {
      if (action) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).end();
    });
});

module.exports = router;
