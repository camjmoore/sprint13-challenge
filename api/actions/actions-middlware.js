function validateAction(req, res, next) {
    const action = 'project_id' in req.body && 'description' in req.body && 'notes' in req.body 

    if (action) {
        next()
    } else {
        res.status(400).end()
    }
}

module.exports = { validateAction }