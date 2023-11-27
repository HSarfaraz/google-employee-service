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
  res.send("Google Employee Service!");
});

app.get("/employees", (req, res) => {
  res.send(employees);
});

app.post("/employees", (req, res) => {
  const employee = req.body;
  employees.push(employee);
  res.send(employees);
});

app.put("/employees", (req, res) => {
  const id = req.body.id;
  const employee = req.body;

  console.log(id);
  console.log(employee);

  for (let i = 0; i < employees.length; i++) {
    if (employees[i].id === id) {
      employees.push(employee);
      res.send(employees);
    }
  }
  res.send("NOT FOUND");
});

app.delete("/employees/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);

  const empIndex = employees.findIndex((emp) => emp.id == id);
  for (let i = 0; i < employees.length; i++) {
    if (employees[i].id == id) {
      employees.splice(empIndex, 1);
      res.send("Deleted successfully");
    }
  }

  res.send("NOT FOUND");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
