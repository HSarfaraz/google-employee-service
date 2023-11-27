const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

/*
app.get()
app.post()
app.update()
app.delete()
*/

let employees = [
  {
    id: 1,
    firstname: "Sarfaraz",
    lastname: "Chaudhary",
    designation: "Sr.Software Engineer",
    mobile: "1234567890",
    email: "s@y.com",
    address: "Hyderabad",
  },
  {
    id: 2,
    firstname: "Sohail",
    lastname: "Chaudhary",
    designation: "Software Engineer",
    mobile: "1234567891",
    email: "a@y.com",
    address: "Sydney",
  },
  {
    id: 3,
    firstname: "Siraj",
    lastname: "Chaudhary",
    designation: "Tech Lead",
    mobile: "1234567892",
    email: "si@y.com",
    address: "Hyderabad",
  },
];

app.get("/", (req, res) => {
  res.status(200).send("Google Employee Service!");
});

app.get("/employees/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);

  for (let i = 0; i < employees.length; i++) {
    if (employees[i].id == id) {
      res.status(200).send(employees[i]);
    }
  }
  res
    .status("404")
    .send("Employee Id is not found, Kindly check your Employee Id");
});

app.post("/employees", (req, res) => {
  const employee = req.body;
  employees.push(employee);
  res.status(201).send(employees);
});

app.put("/employees", (req, res) => {
  const id = req.body.id;
  const employee = req.body;

  console.log(id);
  console.log(employee);

  for (let i = 0; i < employees.length; i++) {
    if (employees[i].id === id) {
      employees.push(employee);
      res.status(200).send(employees);
    }
  }
  res.status(404).send("NOT FOUND");
});

app.delete("/employees/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);

  const empIndex = employees.findIndex((emp) => emp.id == id);
  for (let i = 0; i < employees.length; i++) {
    if (employees[i].id == id) {
      employees.splice(empIndex, 1);
      res.status(200).send("Deleted successfully");
    }
  }

  res.status(404).send("NOT FOUND");
});

app.get("/find/employees/:mobile", (req, res) => {
  let mobile = req.params.mobile;
  console.log(mobile);

  for (let i = 0; i < employees.length; i++) {
    if (employees[i].mobile == mobile) {
      res.status(200).send(employees[i]);
    }
  }
  res.status(404).send("NOT FOUND");
});

app.get("/find/employees", (req, res) => {
  let designation = req.query.designation;
  console.log(designation);

  let filteredDesignation = [];

  for (let i = 0; i < employees.length; i++) {
    if (employees[i].designation == designation) {
      filteredDesignation.push(employees[i]);
    }
  }
  res.status(200).send(filteredDesignation);
});

app.get("/employees", (req, res) => {
  res.status(200).send(employees);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
