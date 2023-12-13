function validateProject(req, res, next) {
    const project = 'name' in req.body && 'description' in req.body && 'completed' in req.body 

    if (project) {
        next()
    } else {
        res.status(400).end()
    }
}

module.exports = { validateProject }