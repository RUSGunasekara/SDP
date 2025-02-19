// registration.js (Frontend)
import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import YourDetails from "./YourDetails";
import PackageDetails from "./PackageDetails";
import PaymentDetails from "./PaymentDetails";
import axios from 'axios';

const steps = ["Your Details", "Package Details", "Payment Details"];

const Registration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  // Refs to manage step-wise data
  const yourDetailsRef = useRef();
  const packageDetailsRef = useRef();
  const paymentDetailsRef = useRef();

  const handleNext = async () => {
    let data = {};
    if (activeStep === 0) {
      if (yourDetailsRef.current && !yourDetailsRef.current.validate()) {
        return;
      }
      data = yourDetailsRef.current.getData();
    } else if (activeStep === 1) {
      if (packageDetailsRef.current && !packageDetailsRef.current.validate()) {
        return;
      }
      data = packageDetailsRef.current.getData();
    } else if (activeStep === 2) {
      if (paymentDetailsRef.current && !paymentDetailsRef.current.validate()) {
        return;
      }
      data = paymentDetailsRef.current.getData();
    }

    // Merge the current step's data into formData.
    setFormData((prevData) => ({ ...prevData, ...data }));

    if (activeStep === steps.length - 1) {
      try {
        // Get CSRF Token before making the request
        const csrfResponse = await axios.get("http://localhost:5000/csrf-token", { withCredentials: true });
        const csrfToken = csrfResponse.data.csrfToken;
  
        // Include CSRF Token in the request
        const response = await axios.post("http://localhost:5000/api/register", formData, {
          withCredentials: true,
          headers: {
            "CSRF-Token": csrfToken, // Include CSRF token in request header
          },
        });
  
        console.log("Registration successful:", response.data);
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1600,
        margin: "auto",
        padding: 3,
        backgroundColor: "#fff",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Typography variant="h3" align="center" sx={{ marginBottom: 4 }}>
        Pradeep Driving School
      </Typography>
      <Typography variant="h5" align="center" sx={{ marginBottom: 4 }}>
        Welcome to Online Registration
      </Typography>
      <br />

      <Box sx={{ marginBottom: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, textAlign: "center" }}>
              All steps completed - Registration is successful!
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ mt: 2 }}>
              {activeStep === 0 && <YourDetails ref={yourDetailsRef} />}
              {activeStep === 1 && <PackageDetails ref={packageDetailsRef} formData={formData} />}
              {activeStep === 2 && <PaymentDetails ref={paymentDetailsRef} />}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
              {activeStep > 0 && (
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    padding: "12px 24px",
                    fontSize: "16px",
                    backgroundColor: "#757575",
                    color: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    "&:hover": {
                      backgroundColor: "#616161",
                    },
                  }}
                  onClick={handleBack}
                >
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                sx={{
                  padding: "14px 28px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  background: "linear-gradient(135deg, #1976D2, #42A5F5)",
                  color: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    background: "linear-gradient(135deg, #1565C0, #1E88E5)",
                    transform: "scale(1.05)",
                  },
                }}
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
};

export default Registration;