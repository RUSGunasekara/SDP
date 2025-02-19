const express = require("express");
const db = require("../db");

const router = express.Router();

router.get('/learner', (req, res) => { // 🔹 Fix: Remove /api
  console.log("Learner API works!");
  const { search } = req.query;
  let sql = `
  SELECT
    L.learner_id,
    L.first_name,
    L.last_name,
    L.email,
    L.mobile_number,
    L.address,
    GROUP_CONCAT(LVC.vehicle_classes SEPARATOR ', ') AS vehicle_classes
  FROM
    Learner L
  LEFT JOIN
    learner_vehicleClass LVC
    ON L.learner_id = LVC.learner_id
  GROUP BY
    L.learner_id, L.first_name, L.last_name, L.email, L.mobile_number, L.address
`;

  const queryParams = [];

  if (search) {
    sql += ` AND (
      L.learner_id LIKE ? 
      OR L.first_name LIKE ? 
      OR L.last_name LIKE ? 
      OR L.email LIKE ? 
      OR L.mobile_number LIKE ? 
      OR L.address LIKE ? 
      OR LVC.vehicle_classes LIKE ? 
      OR L.license_issued_date LIKE ?
    )`;
    queryParams.push(...Array(8).fill(`%${search}%`));
  }

  sql += " GROUP BY L.learner_id";

  console.log("Executing query:", sql);
  db.query(sql, queryParams, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).send(err);
    }
    res.json(result);
  });
});

// Add Learner
router.post("/add-learner", (req, res) => {
  const { learner_id, user_id, first_name, last_name, email, nic, mobile_number, address, license_issued_date, vehicle_classes } = req.body;
  
  // Include the license_issued_date in the insert query
  const sql = `INSERT INTO Learner (learner_id, user_id, first_name, last_name, email, nic, mobile_number, address, license_issued_date) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [learner_id, user_id, first_name, last_name, email, nic, mobile_number, address, license_issued_date], (err, result) => {
    if (err) return res.status(500).send(err);

    // Insert vehicle classes if provided
    if (vehicle_classes && vehicle_classes.length > 0) {
      const vehicleSql = `INSERT INTO learner_vehicleClass (learner_id, vehicle_classes) VALUES ?`;
      const values = vehicle_classes.map(vc => [learner_id, vc]);

      db.query(vehicleSql, [values], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Learner added successfully!" });
      });
    } else {
      res.json({ message: "Learner added successfully!" });
    }
  });
});

// Delete Learner
router.delete("/delete-learner/:id", (req, res) => {
  const sql = `DELETE FROM Learner WHERE learner_id=?`;

  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Learner deleted successfully!" });
  });
});

module.exports = router;
