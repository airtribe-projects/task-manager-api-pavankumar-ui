/* Validate the task data */
function ValidateTaskData(req, res, next) {

    const { title, description, completed } = req.body;

    if (!req.body.title || title.trim() === "") {
        return res
            .status(400)
            .send({ message: "Title is required and  cannot be empty" });
    }


    if (!req.body.description || description.trim() === "") {
        return res
            .status(400)
            .send({ message: "Description is required! cannot be empty" });
    }

    if (typeof req.body.completed !== "boolean") {

        return res
            .status(400)
            .send({ message: "Completed field should be a boolean value" });
    }

    if (req.body.completed === undefined) {

        return res
            .status(400)
            .send({ message: "Completed field is required! cannot be empty" });

    }

    next();
}

module.exports = ValidateTaskData;