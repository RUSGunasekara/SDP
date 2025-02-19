import React, { useState, forwardRef, useImperativeHandle } from "react";
import "./Registration.css";
import { Alert } from "react-bootstrap"; // Import the Bootstrap Alert component

// Wrap with forwardRef so the parent can call internal methods.
const YourDetails = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    telephoneNumber: "",
    email: "",
    addressNo: "",
    street: "",
    addressLine: "",
    city: "",
    vehicleCategory: "",
    licenseIssuedDate: "",
    NIC: "",
    error: "",
  });

  // Update state on change.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      error: "", // Clear error on any change.
    }));
  };
  

  // Calculate age based on NIC
  const calculateAge = (nic) => {
    const birthYear = nic.length === 12 ? parseInt(nic.slice(0, 4), 10) : `19${nic.slice(0, 2)}`;
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };

  // Calculate years since the license was issued.
  const calculateYears = (issuedDate) => {
    const currentYear = new Date().getFullYear();
    const issuedYear = new Date(issuedDate).getFullYear();
    return currentYear - issuedYear;
  };

  // Validate Name
  const validateName = (name) => {
    const namePattern = /^[a-zA-Z\s,.-]+$/;
    return namePattern.test(name);
  };

  // Validate Mobile Number
  const validateMobile = (mobile) => {
    const mobilePattern = /^07\d{8}$/;
    return mobilePattern.test(mobile);
  };

  // Validate Address Number
  const validateAddressNo = (addressNo) => {
    return /^\d+$/.test(addressNo);
  };

  const validateNIC = (nic) => {
    if (!/^\d{12}$/.test(nic) && !/^\d{9}[Vv]$/.test(nic)) {
      return "Invalid NIC format. Use 12 digits or 9 digits followed by 'V'.";
    }
  
    if (nic.length === 12) {
      if (!/[0135678]/.test(nic[4])) {
        return "Invalid NIC: The 5th digit must be 0,1,3,5,6,7, or 8.";
      }
    }
  
    if (nic.length === 10) {
      if (!/[0135678]/.test(nic[2])) {
        return "Invalid NIC: The 3rd digit must be 0,1,3,5,6,7, or 8.";
      }
    }
  
    return ""; // Valid NIC
  };


  // Expose a validate() method that checks required fields.
  const validate = () => {
    // Check that all required fields are non-empty.
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.NIC.trim() ||
      !formData.addressNo.trim() ||
      !formData.street.trim() ||
      !formData.city.trim() ||
      !formData.mobileNumber.trim() ||
      !formData.vehicleCategory
    ) {
      setFormData((prevData) => ({
        ...prevData,
        error: "Please fill in all required fields.",
      }));
      
      return false;
    }

    if (!validateName(formData.firstName) || !validateName(formData.lastName)) {
      setFormData((prevData) => ({
        ...prevData,
        error: "Names cannot contain numbers or invalid characters.",
      }));
      
      return false;
    }

    if (!validateMobile(formData.mobileNumber)) {
      setFormData((prevData) => ({
        ...prevData,
        error: "Mobile number must start with 07 and contain exactly 10 digits.",
      }));
      
      return false;
    }

    if (!validateAddressNo(formData.addressNo)) {
      setFormData((prevData) => ({
        ...prevData,
        error: "Address number must only contain numbers.",
      }));
      
      return false;
    }

    // Validate age requirements based on vehicle category.
    const age = calculateAge(formData.NIC);
    if (formData.vehicleCategory === "heavy" && age < 21) {
      setFormData((prevData) => ({
        ...prevData,
        error: "You must be 21 or older to apply for heavy vehicles.",
      }));
     
      return false;
    }
    if (formData.vehicleCategory === "light" && age < 17) {
      setFormData((prevData) => ({
        ...prevData,
        error: "You must be 17 or older to apply for light vehicles.",
      }));
     
      return false;
    }

    // For heavy vehicles, license issued date is required and must be at least 2 years ago.
    if (formData.vehicleCategory === "heavy") {
      if (!formData.licenseIssuedDate) {
        setFormData((prevData) => ({
          ...prevData,
          error: "License Issued Date is required for heavy vehicles.",
        }));
      
        return false;
      }
      const years = calculateYears(formData.licenseIssuedDate);
      if (years < 2) {
        setFormData((prevData) => ({
          ...prevData,
          error:
            "You cannot apply for heavy vehicles as your license was issued less than 2 years ago.",
        }));
        
        return false;
      }
    }

    const nicError = validateNIC(formData.NIC);
    if (nicError) {
      setFormData((prevData) => ({ ...prevData, error: nicError }));
      alert(nicError);
      return false;
    }


    // Clear any previous error if validation passes.
    setFormData((prevData) => ({ ...prevData, error: "" }));
    return true;
  };

  // Expose getData() to return the current form data.
  const getData = () => formData;

  // Expose the validate and getData methods to the parent.
  useImperativeHandle(ref, () => ({
    validate,
    getData,
  }));

  return (
    <div className="details-container">
      <form className="details-form">
        <p>
          Please fill out the form below to register and become a member of the
          Pradeep Driving School Family.
        </p>

        {/* Show error alert if there's an error */}
        {formData.error && (
          <Alert variant="danger" className="mb-3">
            {formData.error}
          </Alert>
        )}


        <div className="form-inline">
          <div className="form-group">
            <label>
              First Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              required
            />
          </div>
          <div className="form-group">
            <label>
              Last Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>
            Email Address <span className="required">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className="form-group">
          <label>
            NIC <span className="required">*</span>
          </label>
          <input
            type="text"
            name="NIC"
            value={formData.NIC}
            onChange={handleChange}
            placeholder="Enter your NIC"
            required
            pattern="\d{9}[Vv]|\d{12}"
          />
        </div>

        <div className="form-inline">
          <div className="form-group">
            <label>
              Address No <span className="required">*</span>
            </label>
            <input
              type="text"
              name="addressNo"
              value={formData.addressNo}
              onChange={handleChange}
              placeholder="No"
              required
            />
          </div>
          <div className="form-group">
            <label>
              Street <span className="required">*</span>
            </label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="Street"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Address Line (Optional)</label>
          <input
            type="text"
            name="addressLine"
            value={formData.addressLine}
            onChange={handleChange}
            placeholder="Address Line"
          />
        </div>

        <div className="form-group">
          <label>
            City <span className="required">*</span>
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter your city"
            required
          />
        </div>

        <div className="form-inline">
          <div className="form-group">
            <label>
              Mobile Number <span className="required">*</span>
            </label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              required
            />
          </div>
          <div className="form-group">
            <label>Telephone Number</label>
            <input
              type="tel"
              name="telephoneNumber"
              value={formData.telephoneNumber}
              onChange={handleChange}
              placeholder="Enter your telephone number"
            />
          </div>
        </div>

        <div className="form-inline">
          <label>
            Vehicle Category <span className="required">*</span>
          </label>
          <label>
            <input
              type="radio"
              name="vehicleCategory"
              value="light"
              checked={formData.vehicleCategory === "light"}
              onChange={handleChange}
              required
            />
            Light Vehicles
          </label>
          <label>
            <input
              type="radio"
              name="vehicleCategory"
              value="heavy"
              checked={formData.vehicleCategory === "heavy"}
              onChange={handleChange}
              required
            />
            Heavy Vehicles
          </label>
        </div>

        {formData.vehicleCategory === "heavy" && (
          <div className="form-group">
            <label>
              License Issued Date <span className="required">*</span>
            </label>
            <input
              type="date"
              name="licenseIssuedDate"
              value={formData.licenseIssuedDate}
              onChange={handleChange}
              required
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
        )}

       
      </form>
    </div>
  );
});

export default YourDetails;
