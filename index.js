const express = require('express');
const app = express();
require('dotenv').config();
const router = require('./router/router');
const { prisma } = require('./prisma/prisma-client');
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

app.get('/tasks', async(req, res) => {
    const tasks = await prisma.tasks.findMany({
        orderBy: {
            createdAt: 'asc' // Сортировка по убыванию даты создания
        }
    })
    res.render('tasks.ejs', { tasks: tasks })
})



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});