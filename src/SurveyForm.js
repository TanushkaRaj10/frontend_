import { useState } from "react";
import axios from "axios";
import "./SurveyForm.css"; // Importing the CSS file for styling

function SurveyForm() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    nationality: "",
    email: "",
    phone_number: "",
    address: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone_number") {
      // Allow only numbers and limit input to 10 digits
      if (!/^\d{0,10}$/.test(value)) return;
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error when user types
  };

  const validateForm = () => {
    let newErrors = {};

    // Phone number validation (exactly 10 digits)
    if (!/^\d{10}$/.test(formData.phone_number)) {
      newErrors.phone_number = "Phone number must be exactly 10 digits.";
      alert("Phone number must be exactly 10 digits."); // Show alert
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isDisabled) return;
    if (!validateForm()) return; // Stop submission if errors exist

    try {
      setIsDisabled(true);
      await axios.post("http://127.0.0.1:8000/submit", formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting survey:", error);
      setIsDisabled(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="success-message">
        <h2>Form Submitted Successfully</h2>
      </div>
    );
  }

  return (
    <div className="survey-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit} className="survey-form">
        <fieldset>
          <legend>Personal Information</legend>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
          <select name="gender" onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input type="text" name="nationality" placeholder="Nationality" onChange={handleChange} required />
        </fieldset>

        <fieldset>
          <legend>Contact Information</legend>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input
            type="tel"
            name="phone_number"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
          {errors.phone_number && <span className="error">{errors.phone_number}</span>}

          <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
        </fieldset>

        <fieldset>
          <legend>Additional Information</legend>
          <textarea name="message" placeholder="Message" onChange={handleChange} required></textarea>
        </fieldset>

        <button type="submit" className="submit-btn" disabled={isDisabled}>
          {isDisabled ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default SurveyForm;
