const express = require('express');
var bodyParser = require('body-parser')
const router = express.Router();

var jsonParser = bodyParser.json()

//initial values
let taskArr = [];

//get list
router.get("/", (req, res) => {
    try {
        res.json({ tasks: taskArr });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks' })
    }
})

//create task
router.post("/create", jsonParser, (req, res) => {
    try {
        const isAlreadyListed = taskArr.some(data => data.todo === req.body.todo);
        if (isAlreadyListed) {
            res.status(400).json({ message: 'Task is already listed.' });
        } else {
            taskArr.push(req.body);
            res.json({ tasks: taskArr });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error creating tasks' });
    }
})

router
    .route("/:id")
    //get task info by id
    .get((req, res) => {
        res.send(`Get task with id ${req.params.id}`);
    })
    //update task
    .put(jsonParser, (req, res) => {
        try {
            const indexOfObject = taskArr.findIndex(object => {
                return object.key === parseInt(req.params.id);
            });
            taskArr[indexOfObject].todo = req.body.todo;
            res.json({ tasks: taskArr })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error })
        }
    })
    //delete task
    .delete((req, res) => {
        const indexOfObject = taskArr.findIndex(object => {
            return object.key === parseInt(req.params.id);
        });

        taskArr.splice(indexOfObject, 1);
        res.json({ tasks: taskArr });

    })

module.exports = router;
