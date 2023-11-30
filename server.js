const express = require("express");
const mysql = require("mysql");
const { verifyAPIKey } = require("./middleware");
const https = require("https");
const fs = require("fs");

const app = express();
const port = 3000;

var databaseOptions = require("dotenv").config();
var db = mysql.createConnection(databaseOptions);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Google Employee Service!");
});

app.get("/employees/:id", verifyAPIKey, (req, res) => {
  let id = req.params.id;
  console.log(id);

  let sql = "SELECT * FROM googledb.employee WHERE id = ?";
  db.query(sql, id, (error, data) => {
    if (error) {
      return res.send(error);
    }
    // return res.status(200).send(data);
    //custom response with status code and status message
    res.statusMessage = "Got the record in DB";
    res.status(600);
    return res.send(data);
  });
});

app.post("/employees", verifyAPIKey, (req, res) => {
  const employee = req.body;

  let sql = "INSERT INTO googledb.employee SET ?";
  db.query(sql, employee, (error, data) => {
    if (error) return res.status(500).send(error);
    res.status(201).send(employee);
  });
});

app.put("/employees", verifyAPIKey, (req, res) => {
  const id = req.body.id;
  const employee = req.body;

  console.log(id);
  console.log(employee);

  var sql = "UPDATE googledb.employee SET ? WHERE id =?";

  db.query(sql, [employee, id], (error, data) => {
    if (error) return res.status(500).send(error);
    res.status(201).send(employee);
  });
});

app.delete("/employees/:id", verifyAPIKey, (req, res) => {
  let id = req.params.id;
  console.log(id);

  let sql = "DELETE FROM googledb.employee WHERE id = ?";
  db.query(sql, id, (error, data) => {
    if (error) {
      return res.status(500).send(error);
    }
    return res.status(200).send(`Employee of ${id} is deleted`);
  });
});

app.get("/find/employees/by/mobile/:mobile", verifyAPIKey, (req, res) => {
  let mobile = req.params.mobile;
  console.log(mobile);

  let sql = "SELECT * FROM googledb.employee WHERE mobile = ?";
  db.query(sql, mobile, (error, data) => {
    if (error) {
      return res.send(error);
    }
    return res.status(200).send(data);
  });
});

app.get("/find/employees/by/designation", verifyAPIKey, (req, res) => {
  let designation = req.query.designation;
  console.log(designation);

  let sql = "SELECT * FROM googledb.employee WHERE designation = ?";
  db.query(sql, designation, (error, data) => {
    if (error) {
      return res.send(error);
    }
    return res.status(200).send(data);
  });
});

app.get("/employees", verifyAPIKey, (req, res) => {
  let sql = "SELECT * FROM googledb.employee";
  db.query(sql, (error, data) => {
    if (error) {
      return res.send(error);
    }
    return res.status(200).send(data);
  });
});

// Specify the paths to your SSL certificates
const privateKey = fs.readFileSync("ssl/private-key.pem", "utf8");
const certificate = fs.readFileSync("ssl/certificate.pem", "utf8");
const ca = fs.readFileSync("ssl/csr.pem", "utf8");

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

// Create an HTTPS server
const server = https.createServer(credentials, app);

server.listen(port, () => {
  console.log(`Server running on https://localhost:${port}`);
});
