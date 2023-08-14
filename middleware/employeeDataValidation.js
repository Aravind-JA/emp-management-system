const asyncHandler = require('express-async-handler');

const formValidation = asyncHandler(async (req, res, next) => {

  const employee = req.body;

  // Function to validate email format
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Function to validate phone number format
  function validatePhone(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  }

  // Function to validate date format (DD-MM-YYYY)
  function validateDate(date) {
    const dateRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/;
    return dateRegex.test(date);
  }

  const errors = [];

  if (!employee.salutation) {
    errors.push("Salutation is required");
  }
  if (!employee.firstName) {
    errors.push("First Name is required");
  }
  if (!employee.lastName) {
    errors.push("Last Name is required");
  }
  if (!employee.email) {
    errors.push("Email is required");
  } else if (!validateEmail(employee.email)) {
    errors.push("Invalid email format");
  }
  if (!employee.phone) {
    errors.push("Phone is required");
  } else if (!validatePhone(employee.phone)) {
    errors.push("Invalid phone number format");
  }
  if (!employee.dob) {
    errors.push("Date of Birth is required");
  } else if (!validateDate(employee.dob)) {
    errors.push("Invalid date format. Please use DD-MM-YYYY format");
  }
  if (!employee.gender) {
    errors.push("Gender is required");
  }
  if (!employee.qualifications) {
    errors.push("Qualifications are required");
  }
  if (!employee.address) {
    errors.push("Address is required");
  }
  if (!employee.city) {
    errors.push("City is required");
  }
  if (!employee.state) {
    errors.push("State is required");
  }
  if (!employee.country) {
    errors.push("Country is required");
  }
  if (errors) {
    res.json(errors);
  } else {
    next();
  }

});

module.exports = formValidation;