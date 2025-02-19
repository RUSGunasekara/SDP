import React, { useState, forwardRef, useImperativeHandle } from "react";
import { styled } from "@mui/material/styles";
import "./Registration.css";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const PaymentDetails = forwardRef((props, ref) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  // Online payment fields
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
    // Reset fields when switching payment methods
    setUploadedFile(null);
    setCardName("");
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      console.log("No file selected");
      return;
    }

    const fileSize = files[0].size / 1024 / 1024; // Convert to MB
    if (fileSize > 2) {
      alert("File size exceeds the 2MB limit. Please upload a smaller file.");
    } else {
      setUploadedFile(files[0]);
      console.log("File selected:", files[0]);
    }
  };

  const handleCheckboxChange = (e) => {
    setIsAgreed(e.target.checked);
  };

  // Handlers for online payment fields:
  const handleCardNameChange = (e) => setCardName(e.target.value);
  const handleCardNumberChange = (e) => setCardNumber(e.target.value);
  const handleExpiryDateChange = (e) => setExpiryDate(e.target.value);
  const handleCvvChange = (e) => setCvv(e.target.value);

  // Expose validate and getData methods to the parent via ref.
  useImperativeHandle(ref, () => ({
    validate: () => {
      // Ensure a payment method is selected.
      if (!paymentMethod) {
        alert("Please select a payment method.");
        return false;
      }
      // Ensure consent is given.
      if (!isAgreed) {
        alert("You must agree to the privacy policy and terms and conditions.");
        return false;
      }
      // Additional checks for online payment details.
      if (paymentMethod === "online") {
        if (
          !cardName.trim() ||
          !cardNumber.trim() ||
          !expiryDate.trim() ||
          !cvv.trim()
        ) {
          alert("Please fill in all online payment details.");
          return false;
        }
      }
      // For bank transfer, ensure a file has been uploaded.
      if (paymentMethod === "bank" && !uploadedFile) {
        alert("Please upload your bank transfer receipt.");
        return false;
      }
      return true;
    },
    getData: () => {
      let onlinePaymentDetails = {};
      if (paymentMethod === "online") {
        onlinePaymentDetails = {
          cardName,
          cardNumber,
          expiryDate,
          cvv,
        };
      }
      return {
        paymentMethod,
        isAgreed,
        uploadedFile,
        onlinePaymentDetails,
      };
    },
  }));

  return (
    <div className="payment-detail">
      <h2>Payment Details</h2>
      <p className="warning-text">
            <strong>Note:</strong> We will not recover any amount other than the
            pledge amount.
      </p>
      
      <div className="form-group">
        <h4>Select Payment Method:</h4>
        <label>
          <input
            type="radio"
            value="online"
            checked={paymentMethod === "online"}
            onChange={handlePaymentChange}
          />
          Online Pay (Visa, Mastercard)
        </label>
        <label>
          <input
            type="radio"
            value="bank"
            checked={paymentMethod === "bank"}
            onChange={handlePaymentChange}
          />
          Bank Transfer
        </label>
        <br/>
      </div>

      {paymentMethod === "bank" && (
        <div className="bank-transfer">
          <h4>Bank Transfer</h4>
          <div className="bank-details">
            <img
              src="https://seeklogo.com/images/P/peoples-bank-logo-63CED1E575-seeklogo.com.png"
              alt="Peoples bank Logo"
              style={{ width: "100px" }}
            />
            <ul>
              <li>
                <strong>Bank Name:</strong> People's Bank
              </li>
              <li>
                <strong>Bank Branch:</strong> Kiribathgoda
              </li>
              <li>
                <strong>Account Name:</strong> Pradeep Driving School
              </li>
              <li>
                <strong>Account Number:</strong> 237200280043504
              </li>
            </ul>
          </div>
        
          <div className="file-upload">
            <Button
              component="label"
              variant="contained"
              color="primary"
              startIcon={<CloudUploadIcon />}
              style={{
                borderRadius: "8px",
                padding: "8px 12px",
                fontSize: "14px",
                maxWidth: "200px",
                maxHeight: "40px",
              }}
            >
              Choose File
              <VisuallyHiddenInput
                type="file"
                onChange={handleFileUpload}
                accept=".jpg,.png,.pdf,.doc,.docx"
              />
            </Button>
            <p className="file-size-info">Maximum File Size: 2MB</p>
          </div>
         
          {/* Display file upload status */}
          <div className="file-upload-status">
            {uploadedFile ? (
              <strong>File Uploaded: {uploadedFile.name}</strong>
            ) : (
              <strong>No file uploaded</strong>
            )}
          </div>
        
        </div>
      )}

      {paymentMethod === "online" && (
        <div className="online-payment">
          <h4>Online Payment Details</h4>
          <div className="form-group">
            <div className="form-row">
              <label>
                Name on Card:
                <input
                  type="text"
                  placeholder="Enter cardholder name"
                  value={cardName}
                  onChange={handleCardNameChange}
                />
              </label>
              <label>
                Card Number:
                <input
                  type="text"
                  placeholder="Enter your card number"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                Expiry Date:
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                />
              </label>
              <label>
                CVV:
                <input
                  type="text"
                  placeholder="Enter CVV"
                  value={cvv}
                  onChange={handleCvvChange}
                />
              </label>
            </div>
          </div>
        </div>
      )}

      <br/>
      <div className="consent">
        <label>
          <input
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={isAgreed}
          />{" "}
          Yes, I agree with the{" "}
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
            privacy policy
          </a>{" "}
          and{" "}
          <a
            href="/terms-and-conditions"
            target="_blank"
            rel="noopener noreferrer"
          >
            terms and conditions
          </a>
          .
        </label>
      </div>
    </div>
  );
});

export default PaymentDetails;
