const TasksController = require('../../controllers/tasks-controller/tasks-controller');

const router = require('express').Router();



router.get('/getTasks', TasksController.getTasks)
router.post('/createTask', TasksController.createTask)
router.post('/updateTask/:id', TasksController.updateTask)
router.post('/deleteTask/:id', TasksController.deleteTask)
router.post('/deleteTasks', TasksController.deleteTasks)

module.exports = router;