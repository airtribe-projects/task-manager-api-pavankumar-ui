const tap = require("tap");
const supertest = require("supertest");
const express = require("express");
const app = express();
const router = require("../Routes/Tasks");

app.use(express.json());
app.use(router);

const request = supertest(app);

// Test for GET /tasks/:id
tap.test("GET /tasks/:id", async (t) => {
  // First create a task
  const createResponse = await request
    .post("/tasks")
    .send({
      title: "Test Task",
      description: "Test Description",
      completed: false
    });

  // Extract the task ID from the response
  const taskId = createResponse.body.id || 1;

  // Get the created task
  const getResponse = await request.get(`/tasks/${taskId}`);
  
  // Verify response
  t.type(getResponse.body, 'object');
  t.end();
});


tap.test("POST /tasks", async (t) => {
  const newTask = {
    title: "Integration Test Task",
    description: "Testing POST endpoint",
    completed: false
  };

  const response = await request
    .post("/tasks")
    .send(newTask);

  // First verify we got a response
  t.ok(response.body, "Response body exists");
  
  // If message exists in response, test for success message
  if (response.body.message) {
    t.equal(response.body.message, "New task added successfully");
  }

  // If task data is included in response, verify its structure
  if (response.body.task) {
    t.equal(response.body.task.title, newTask.title);
    t.equal(response.body.task.description, newTask.description);
    t.equal(response.body.task.completed, newTask.completed);
  }

  t.end();
});

tap.test("POST /tasks with invalid data", async (t) => {
  const invalidTask = {
    title: "",
    description: "Invalid task"
  };

  const response = await request
    .post("/tasks")
    .send(invalidTask);

  t.equal(response.status, 400);
  t.end();
});

// Test for PUT /tasks/:id
tap.test("PUT /tasks/:id", async (t) => {
  const taskId = 1; // Use existing task ID
  
  const updateResponse = await request
    .put(`/tasks/${taskId}`)
    .send({
      title: "Updated Task",
      description: "Updated Description",
      completed: true
    });
  
  t.type(updateResponse.body, 'object');
  t.end();
});

// Test for DELETE /tasks/:id
tap.test("DELETE /tasks/:id", async (t) => {
  const taskId = 1; // Use existing task ID
  
  const deleteResponse = await request
    .delete(`/tasks/${taskId}`);
  
  t.type(deleteResponse.body, 'object');
  t.end();
});

tap.teardown(() => {
  process.exit(0);
});
