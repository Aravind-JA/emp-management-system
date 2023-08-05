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
        throw new Error("Employee id is invalid.")
    }
    res.status(200).json(employee);
});

// function to create a new employee
const createEmployee = asyncHandler(async (req, res) => {
    console.log("The request body is:", req.body);
    const { name, email, phone } = req.body;
    
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    
    const employee = await Employee.create({
        name, email, phone,
    });

    res.status(201).json({ message: "Employee created successfully", employee });
});

// function to update an employee 
const updateEmployee = asyncHandler(async (req, res) => {
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