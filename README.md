#Task Management API

A simple RESTful API for managing tasks built with Node.js and express.js and in-memory data.

## Table Of Contents

1. Features
2. Getting Started
   a. technlogies/tools used

3. Prerequisites to be installed on your machine.

4. Setup Instructions and installation of packages.

5. API Endpoints

6. Testing the API using Postman

a. To Get all the Tasks present in task.json file:
b. To Get a specific task by ID:
c. To Create a new task:
d. To Update a task by ID:
e. To Delete a task by ID:

## Features

- Create the new task having title,description and status field as completed or not(Boolean).
- Update the task
- Delete the task
- Get the task by id
- get all the tasks.
- In-memory Data Storage (implemented Tasks Array).
- Vaildations with appropriate status codes for error and data messages.
- Helper functions as files ExceptionStatus and ValidateTask in Utils Directory (DRY Principle).

## Getting Started

##Technologies/Tools Used

1. **Node.js** for runtime environment.
2. **Express.js** for building the API.
3. **File System (fs)** module for file operations, generally for read and write operations.
4. **Postman** for testing the API.

---

### Prerequisites to be installed on your machine.

- Make sure your Node.js version to be installed more than 18, not below versions.
- npm Command Line Interface (CLI) which comes under node to install the required packages.

## Setup Instructions and installation of packages.

_Step1_: Clone the repository having github classroom link to your machine with your specific drive.

- Git clone https://github.com/airtribe-projects/task-manager-api-pavankumar-ui.git

the above command will clone/Fork the repository to your machine.

_Step 2_ : Navigate to the Project Directory.

- Type `cd task-manager-api-pavankumar-ui` in the terminal.

_Step 3_ : install the dependencies.

- `npm install` in the terminal.

_Step 4_ : install nodemon.

- `npm install nodemon --save-dev` in the terminal.

_Step 5_ : Now in the package.json file, add the following script:

- "dev": "nodemon app.js" in the scripts object present in package.json file.

_Step 6_ : Run the app.js file.

- npm run dev in the terminal.

_Step 7_ : Install the express package.

- npm install express --save in the terminal.

_Step 8_ : Now check whether the server is running in the port 3000 or not in the terminal.

_Step 9_ : If you want to place the PORT in the env file then you can install the dotenv package.

- `npm install dotenv --save-dev`
  (this will install the dotenv package in the project at the dev dependencies object in the package.json file).

- Now include the dependencies in the app.js file.
  `require("dotenv").config();`

- Then create the environment variable as PORT in the .env file.

- to retrive the port,give the following code in the app.js file.

  `const port = process.env.PORT || 3000;`

  app.listen(PORT, (err) => {
  if (err) {
  return console.log("Something bad happened", err);
  }
  console.log('Server is listening on ${PORT}`);
  });

- now restart the server.

_Step 10_ : The API will be available at `http://localhost:3000`.

- you can test the API using the postman.

## API ENDPOINTS

- **API Endpoints and their descriptions given below**:

Method Endpoint Description Body Parameters
GET ---- /tasks ----Get all tasks N/A
GET ----- /tasks/:id ---- Get a specific task by ID N/A

POST ------ /tasks ------Create a new task `{ "title": "Task title",
                                                "description":"demo description",
                                                 "completed": false
                                                 }`

PUT ------- /tasks/:id ----Update a task by ID `{ "title": "Updated title",
                                                  "description":"updated demo description",
                                                  "completed": true
                                                }`

DELETE ------ /tasks/:id --------- Delete a task by ID ----- N/A

## Testing the API using Postman

- Before testing the API , make sure you have given `Content-type` as `application/json` in the Headers.

- API links to test the API using Postman:

1.  To Get all the Tasks present in task.json file:

- curl -X GET `http://localhost:3000/tasks`

Then press send in the Postman, you will get the response in the body section,repeat the same steps for the other API's as well.

- If you want to get the response in the form of JSON then select JSON in the body section and press send,
  Repeat the same step for step 2 as well.

2.  To Get a specific task by ID:

- curl -X GET `http://localhost:3000/tasks/2`

      - If the id is present in the task.json file then you will get the response with status code [200] with json code as below:

  {
  "id": 2,
  "title": "Create a new project",
  "description": "Create a new project using the Express application generator",
  "completed": true
  }

       as the single task object.

## Validation usage:

- If the id is not present in the task.json file then you will get the response with status code [404]
  with `{'message':"Task not found"}`.

3.  To Create a new task:

- curl -X POST `http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title": "New Task", "completed": false}'`.

- Now add the task title ,description and completed status in the body section then select JSON and press send button.

Example:
{
"title": "Implement Router",
"description": "Implement Router and pass router to the main app.js",
"completed": false
}

- In the response your id will be present at the end of the task object in the body section present in task.json file.

Example:

{
"title": "Implement Router",
"description": "Implement Router and pass router to the main app.js",
"completed": false,
"id": 20
}

- the above response will get if you successfully input the task title,description and completed status in the body section with status code as [201] created with message
  `{message: "New task added successfully"}`
  and the id of the task object.

  ## validation usage:

- If you input the task title,description and completed status in the body section as empty value, you will get status code as [400] bad request with message
  `{message: "Field is required ,cannot be empty"}`

- If you input the completed field as string value, you will get status code as [400] bad request with message
  `{message: "Completed field must be a boolean value"}`

4.  To Update a task by ID:

- curl -X PUT `http://localhost:3000/tasks/1 -H "Content-Type: application/json" -d '{"title": "Updated Task", "completed": true}'`

- to change the specific fields in the task object, add the id in the url and add the updated fields in the body section.


## validation usage:

- In the response you will get task is updated successfully, only if you input correct id,
  if you input wrong id, you will get the error message as `{"message":"Task not found"}`
  with [404] status in the body section.

  5. To Delete a task by ID:

  - curl -X DELETE `http://localhost:3000/tasks/1`

  - In the response you will get `{ message: "Task deleted successfully" }`
    with status code [200], only if you input correct id.

## Validation usage:

- if you input wrong id, you will get the error message as `{ error: "Task doesnot exist for the given id" }` with [404] status in the body section.
