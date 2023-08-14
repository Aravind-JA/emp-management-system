const express = require('express');
const router = express.Router();
const { getEmployee, getOneEmployee, createEmployee, updateEmployee, deleteEmployee } = require('../controllers/empContoller');
const validateToken = require('../middleware/userValidation');
const formValidation = require('../middleware/employeeDataValidation')

// router.use(validateToken);
// route: /employee
router.route("/").get(getEmployee).post(createEmployee);

// route: /employee/:id 
router.route("/:id").get(getOneEmployee).put(updateEmployee).delete(deleteEmployee);

module.exports = router;