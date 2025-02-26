const router = require('express').Router();
const TasksRouter = require('./tasks-router/tasks-router');



router.use('/tasks', TasksRouter)


module.exports = router;