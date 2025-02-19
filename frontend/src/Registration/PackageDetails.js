import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Card, Form, ListGroup } from "react-bootstrap";
import "./Registration.css";

const PackageDetails = forwardRef(({ formData = {} }, ref) => {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [totalFees, setTotalFees] = useState(0);

  const vehicleClasses = {
    light: [
      { class: "A1", fee: 5000 },
      { class: "B", fee: 7000 },
      { class: "C", fee: 6000 },
    ],
    heavy: [
      { class: "C1", fee: 10000 },
      { class: "CE", fee: 12000 },
      { class: "D", fee: 11000 },
    ],
  };

  const handleClassSelection = (e) => {
    const { value, checked } = e.target;
    const category = formData.vehicleCategory;
    const vehicle = vehicleClasses[category]?.find((v) => v.class === value);
    if (!vehicle) return;

    if (checked) {
      setSelectedClasses((prev) => [...prev, vehicle]);
    } else {
      setSelectedClasses((prev) => prev.filter((v) => v.class !== value));
    }
  };

  useEffect(() => {
    const total = selectedClasses.reduce((sum, c) => sum + c.fee, 0);
    setTotalFees(total);
  }, [selectedClasses]);

  useImperativeHandle(ref, () => ({
    validate: () => {
      if (selectedClasses.length === 0) {
        alert("Please select at least one vehicle class.");
        return false;
      }
      return true;
    },
    getData: () => ({
      vehicle_classes: selectedClasses.map((c) => c.class).join(","), // Convert array to string
      totalFees,
    }),
    
  }));

  return (
    <div className="d-flex justify-content-center mt-4">
      <Card className="p-4 shadow-lg" style={{ width: "40rem", borderRadius: "10px" }}>
        <Card.Body>
          <Card.Title className="text-primary fw-bold fs-4">Package Details</Card.Title>

          {formData.vehicleCategory && vehicleClasses[formData.vehicleCategory] && (
            <div className="form-group">
              <Card.Subtitle className="text-muted mb-3 fs-5">
                Select Vehicle Classes (
                {formData.vehicleCategory.charAt(0).toUpperCase() +
                  formData.vehicleCategory.slice(1)}
                ):
              </Card.Subtitle>

              <Form>
                {vehicleClasses[formData.vehicleCategory].map((vClass) => (
                  <Form.Check
                    key={vClass.class}
                    type="checkbox"
                    label={`${vClass.class} (Rs. ${vClass.fee})`}
                    value={vClass.class}
                    onChange={handleClassSelection}
                    className="mb-2"
                  />
                ))}
              </Form>
            </div>
          )}

          <hr />

          <h5 className="fw-bold mt-3 text-dark">Selected Classes:</h5>
          {selectedClasses.length > 0 ? (
            <ListGroup className="mb-3">
              {selectedClasses.map((c) => (
                <ListGroup.Item key={c.class} className="d-flex justify-content-between">
                  <span>{c.class}</span>
                  <span className="text-success">Rs. {c.fee}</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p className="text-muted">No classes selected.</p>
          )}

          <h5 className="fw-bold text-success">Total Fees: Rs. {totalFees}</h5>

  
        </Card.Body>
      </Card>
    </div>
  );
});

export default PackageDetails;
