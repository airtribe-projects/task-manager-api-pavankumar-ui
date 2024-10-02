const express = require("express");
const router = express.Router();
const fs = require("fs");
const ValidateTaskData = require("../Utils/ValidateTask");
const ExceptionStatus = require("../Utils/ExceptionStatus");

/* To get the tasks */
router.get("/tasks", (req, res) => {
    fs.readFile("task.json", "utf-8", (err, data) => {
        //Call the ExceptionStatus function to handle the error//
        ExceptionStatus(err, res);

        if (!data) {
            return res.status(404).send({ message: "Task not found" });
        } else {
            return res.status(200).send(data);
        }
    });
});

/* To get the specific task by its ID */
router.get("/tasks/:id", (req, res) => {
    fs.readFile("task.json", "utf-8", (err, data) => {
        // Call the ExceptionStatus function to handle the error
        ExceptionStatus(err, res);

        let taskData;
        try {
            taskData = JSON.parse(data);
        } catch (e) {
            return res.status(500).json({ error: "Invalid task data format" });
        }

        // Ensure taskData contains an array of tasks or an object
        const tasks = taskData.tasks || taskData;

        // Convert taskId to an integer and validate
        const taskId = parseInt(req.params.id, 10);

        if (isNaN(taskId)) {
            return res
                .status(400)
                .json({ error: "Invalid task ID ! number is accepted" });
        }

        // Find the task by its ID
        const task = tasks.find((t) => t.id === taskId);

        if (task) {
            console.log(`Your requested data for the given ID ${taskId} is:`, task);
            res.status(200).json(task);
        } else {
            res.status(404).json({ error: "Task Not Found for invalid ID" });
        }
    });
});

/* to Upload the new task data */
router.post("/tasks", ValidateTaskData, (req, res) => {
    const newTask = req.body;
    fs.readFile("task.json", "utf-8", (err, data) => {
        //Call the ExceptionStatus function to handle the error//
        ExceptionStatus(err, res);

        const taskData = JSON.parse(data);
        const tasks = taskData.tasks || taskData;

        // Find the highest ID in the existing tasks
        const highestId = tasks.reduce((maxId, task) => {
            return task.id > maxId ? task.id : maxId;
        }, 0);

        // Generate a new ID by incrementing the highest ID//

        newTask.id = highestId + 1;

        //append the new task to the tasks array//
        tasks.push(newTask);

        //write the updated tasks array back to the file//

        const updatedTaskdata = taskData.tasks ? { tasks } : taskData;
        //to preserve the existing tasks if any//

        fs.writeFile(
            "task.json",
            JSON.stringify(updatedTaskdata, null, 2),
            (err) => {
                if (err) {
                    console.log("failed to write the task data", err);
                    return res.status(500).send({ message: "Internal Server Error" });
                }

                console.log("newly inserted Data", newTask);
                return res.status(201).json({ message: "New task added successfully" });
            }
        );
    });
});

/* to update the task data */
router.put("/tasks/:id", ValidateTaskData, (req, res) => {
    fs.readFile("task.json", "utf-8", (err, data) => {
        //Call the ExceptionStatus function to handle the error//
        ExceptionStatus(err, res);

        const taskId = parseInt(req.params.id);
        const taskData = JSON.parse(data);
        const tasks = taskData.tasks || taskData;
        const updatedTask = tasks.find((t) => t.id === taskId);

        //check if the task exists Validation!//
        if (!updatedTask) {
            return res.status(404).json({ error: "Task Not Found for invalid Id" });
        }

        if (isNaN(taskId)) {
            return res.status(400).json({ error: "Invalid task ID" });
        }

        updatedTask.title = req.body.title;
        updatedTask.description = req.body.description;
        updatedTask.completed = req.body.completed;

        fs.writeFile("task.json", JSON.stringify(taskData, null, 2), (err) => {
            if (err) {
                console.log("Failed to write the task data", err);
                return res.status(500).send("Internal Server Error");
            }

            console.log("Task updated successfully");
            return res.status(200).json({ message: "Task updated successfully" });
        });
    });
});

/* to delete the task data */
router.delete("/tasks/:id", (req, res) => {
    fs.readFile("task.json", "utf-8", (err, data) => {
        //Call the ExceptionStatus function to handle the error//
        ExceptionStatus(err, res);

        const taskId = parseInt(req.params.id);
        const taskData = JSON.parse(data);
        const tasks = taskData.tasks || taskData;

        if (isNaN(taskId)) {
            return res
                .status(400)
                .json({ error: "Invalid task ID! number is accepted" });
        }

        const taskIndex = tasks.findIndex((index) => index.id === taskId);

        //to check if the task exists before deleting it //

        if (taskIndex === -1) {
            return res
                .status(404)
                .json({ error: "Task doesnot exist for the given id" });
        }

        tasks.splice(taskIndex, 1);
        console.log(taskIndex);

        fs.writeFile("task.json", JSON.stringify(taskData, null, 2), (err) => {
            if (err) {
                console.log("Failed to delete the task data", err);
                return res.status(500).send("Internal Server Error");
            }

            console.log("Task deleted successfully");
            res.status(200).json({ message: "Task deleted successfully" });
        });
    });
});

module.exports = router;
