
function ExceptionStatus(err, res) {
    if (err) {
        console.log("Failed to read the task data", err);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = ExceptionStatus;