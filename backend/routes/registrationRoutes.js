const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
require("dotenv").config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to generate a PDF receipt
const generateReceipt = (paymentDetails) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const receiptPath = path.join(__dirname, `../receipts/receipt_${paymentDetails.payment_id}.pdf`);
    
    fs.mkdirSync(path.join(__dirname, "../receipts"), { recursive: true });
    
    const writeStream = fs.createWriteStream(receiptPath);
    doc.pipe(writeStream);

    doc.fontSize(20).text("Pradeep Driving School", { align: "center" }).moveDown();
    doc.fontSize(14).text(`Receipt ID: ${paymentDetails.payment_id}`);
    doc.text(`Date: ${paymentDetails.payment_date}`);
    doc.text(`Time: ${paymentDetails.payment_time}`).moveDown();
    doc.fontSize(16).text("Learner Details", { underline: true });
    doc.fontSize(12).text(`Name: ${paymentDetails.learner_name}`);
    doc.text(`Address: ${paymentDetails.address}`).moveDown();
    doc.fontSize(16).text("Payment Details", { underline: true });
    doc.fontSize(12).text(`Paid Amount: Rs. ${paymentDetails.paid_amount.toFixed(2)}`);
    doc.text(`Balance Amount: Rs. ${paymentDetails.amount_due.toFixed(2)}`).moveDown();
    doc.fontSize(12).text(`Selected Category: ${paymentDetails.vehicleCategory}`).moveDown();
    doc.fontSize(16).text("Vehicle Classes", { underline: true });
    doc.fontSize(12).text(`Selected Classes: ${paymentDetails.vehicle_classes}`).moveDown();
    doc.text("Thank you for choosing Pradeep Driving School!", { align: "center" });
    doc.end();

    writeStream.on("finish", () => resolve(receiptPath));
    writeStream.on("error", reject);
  });
};

// Registration endpoint
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, mobileNumber, NIC, addressNo, street, city, vehicleCategory, license_issued_date, vehicle_classes,totalFees, paymentMethod, paymentStatus } = req.body;

  try {
    const [lastUser] = await db.query("SELECT user_id FROM Users ORDER BY user_id DESC LIMIT 1");
    const lastUserId = lastUser.length > 0 ? lastUser[0].user_id : "Lr0000";
    const newUserId = `Lr${String(parseInt(lastUserId.slice(2)) + 1).padStart(4, "0")}`;
    const formattedDate = license_issued_date ? new Date(license_issued_date).toISOString().split('T')[0] : null;

    const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
    const password = Math.random().toString(36).slice(-8);
    const passwordHash = await bcrypt.hash(password, 10);

    await db.query("INSERT INTO Users (user_id, username, password_hash, role) VALUES (?, ?, ?, ?)", [newUserId, username, passwordHash, "Learner"]);
    await db.query("INSERT INTO Learner (learner_id, user_id, first_name, last_name, email, nic, mobile_number, address, license_issued_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)",
      [newUserId, newUserId, firstName, lastName, email, NIC, mobileNumber, `${addressNo}, ${street}, ${city}`,formattedDate]);
    await db.query("INSERT INTO learner_vehicleClass (learner_id, vehicle_classes) VALUES (?, ?)", [newUserId, vehicle_classes]);

    const paymentResult = await db.query("INSERT INTO Payment (learner_id, amount, payment_method, payment_status) VALUES (?, ?, ?, ?)",
      [newUserId, totalFees, paymentMethod, paymentStatus]);
    const paymentId = paymentResult.insertId;

    const [paymentDetails] = await db.query("SELECT payment_id, learner_id, amount AS paid_amount, 0 AS amount_due, amount AS total_amount, NOW() AS payment_date, '12:00' AS payment_time FROM Payment WHERE payment_id = ?",
      [paymentId]);
    
    paymentDetails.learner_name = `${firstName} ${lastName}`;
    paymentDetails.address = `${addressNo}, ${street}, ${city}`;
    paymentDetails.vehicleCategory = vehicleCategory;
    paymentDetails.vehicle_classes = vehicle_classes;

    const receiptPath = await generateReceipt(paymentDetails);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Pradeep Driving School Login & Payment Receipt",
      text: `Dear ${firstName},\n\nYour registration is successful!\n\nYour login credentials:\nUsername: ${username}\nPassword: ${password}\n\nYour payment receipt is attached.\n\nBest regards,\nPradeep Driving School`,
      attachments: [{ filename: `Receipt_${paymentId}.pdf`, path: receiptPath }],
    });

    await db.query("INSERT INTO CredentialsSent (user_id, sent_at, email_sent_at) VALUES (?, NOW(), NOW())", [newUserId]);
    await db.query("INSERT INTO receipt (receipt_name, description, payment_id, generated_date) VALUES (?, ?, ?, NOW())", [
      `Receipt_${paymentId}`, "Payment confirmation receipt", paymentId]);

    res.status(200).json({ success: true, message: "Registration successful!" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ success: false, message: "Registration failed." });
  }
});

module.exports = router;
