const asyncHandler = require("express-async-handler");
const Employee = require("../models/employeeModel");

// function to read all employee
const getEmployee = asyncHandler(async (req, res) => {
    const employees = await Employee.find()
    res.status(200).json(employees);
});

// function to read an employee with id
const getOneEmployee = asyncHandler(async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
        res.status(400);
        throw new Error("Employee id is invalid.");
    }
    res.status(200).json(employee);
});

// function to create a new employee
const createEmployee = asyncHandler(async (req, res) => {
    console.log("Executed createEmployee");
    console.log("The request body is:", req.body);
    // const { salutation,firstName,lastName,email,phone,dob,gender,qualifications,address,country,state,city,pin } = req.body;
 
    const employee = await Employee.create({
        salutation: req.body.salutation,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        dob: req.body.dob,
        gender: req.body.gender,
        qualifications: req.body.qualifications,
        address: req.body.address,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        pin:req.body.pin
    });
    employee.save();
    res.status(201).json({ message: "Employee created successfully", employee });
});

// function to update an employee 
const updateEmployee = asyncHandler(async (req, res) => {

    console.log(req.body);

    const employee = await Employee.findById(req.params.id);
    if (!employee) {
        res.status(400);
        throw new Error("Employee id is invalid.")
    }

    const newEmployee = await Employee.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json(newEmployee);
});

// function to delete an employee
const deleteEmployee = asyncHandler(async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
        res.status(400);
        throw new Error("Employee id is invalid.")
    }
    await Employee.deleteOne({_id: req.params.id});
    res.status(200).json({ message: "Deleted Employee" })
});


module.exports = { getEmployee, getOneEmployee, createEmployee, updateEmployee, deleteEmployee };