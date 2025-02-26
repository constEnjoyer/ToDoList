const { prisma } = require('../../prisma/prisma-client');

const TasksController = {
    getTasks: async(req, res) => {
        try {
            const tasks = await prisma.tasks.findMany()
            res.status(200).json(tasks)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    },
    createTask: async(req, res) => {
        const { text } = req.body
        try {
            const task = await prisma.tasks.create({
                data: {
                    text: text,
                    completed: false
                }
            })
            res.redirect('/tasks')
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    },
    updateTask: async(req, res) => {
        const id = Number(req.params.id)
        try {
            const currentTask = await prisma.tasks.findUnique({
                where: { id }
            });

            if (!currentTask) {
                return res.status(404).json({ error: 'Task not found' });
            }
            const task = await prisma.tasks.update({
                where: {
                    id: id
                },
                data: {
                    completed: !currentTask.completed
                }
            })
            res.redirect('/tasks')
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    },
    deleteTask: async(req, res) => {
        const id = Number(req.params.id)
        try {
            const task = await prisma.tasks.delete({
                where: {
                    id: id
                }
            })
            res.redirect('/tasks')
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    },
    deleteTasks: async(req, res) => {
        try {
            const tasks = await prisma.tasks.deleteMany()
            await prisma.$executeRaw `ALTER SEQUENCE "Tasks_id_seq" RESTART WITH 1;`
            res.redirect('/tasks')
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}


module.exports = TasksController;