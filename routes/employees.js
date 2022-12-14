const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employees');
const departmentsController = require('../controllers/departments');
const jobsController = require('../controllers/jobs');

router.get('/', async (req, res) => {
   try {
      const results = await employeesController.getAll();

      res.status(200).json(results);
   } catch (error) {
      throw error;
   }
});

router.get('/:id', async (req, res) => {
   const id = Number(req.params.id);
   try {
      const results = await employeesController.getById(id);

      if (results.length == 0) res.status(404).json({ id, status: 'Not Found' });
      else res.status(200).json(results);
   } catch (error) {
      throw error;
   }
});

router.post('/', async (req, res) => {
   const {
      employee_id,
      first_name,
      last_name,
      email,
      phone_number,
      hire_date,
      job_id,
      salary,
      manager_id,
      department_id,
   } = req.body;
   const id = Number(employee_id);
   try {
      const checkEmployee = await employeesController.getById(id);
      const checkJobExists = await jobsController.getById(Number(job_id));
      const checkManagerExists = await employeesController.getById(manager_id);
      const checkDepartmentExists = await departmentsController.getById(
         Number(department_id)
      );

      if (checkEmployee.length > 0) {
         res.status(400).json({ id, status: 'Already exists' });
      } else if (checkJobExists.length == 0) {
         res.status(404).json({ job_id, status: 'Not Found' });
      } else if (checkManagerExists.length == 0) {
         res.status(404).json({ manager_id, status: 'Not Found' });
      } else if (checkDepartmentExists.length == 0) {
         res.status(404).json({ department_id, status: 'Not Found' });
      } else {
         await employeesController.addEmployee(
            id,
            first_name,
            last_name,
            email,
            phone_number,
            hire_date,
            job_id,
            salary,
            manager_id,
            department_id
         );

         res.status(201).json({ id, status: 'Employee successfully added' });
      }
   } catch (error) {
      throw error;
   }
});

router.put('/:id', async (req, res) => {
   const id = Number(req.params.id);
   const {
      first_name,
      last_name,
      email,
      phone_number,
      hire_date,
      job_id,
      salary,
      manager_id,
      department_id,
   } = req.body;
   try {
      const checkEmployee = await employeesController.getById(id);
      const checkJobExists = await jobsController.getById(Number(job_id));
      const checkManagerExists = await employeesController.getById(manager_id);
      const checkDepartmentExists = await departmentsController.getById(
         Number(department_id)
      );

      if (checkEmployee.length == 0) {
         res.status(400).json({ id, status: 'Not Found' });
      } else if (checkJobExists.length == 0) {
         res.status(404).json({ job_id, status: 'Not Found' });
      } else if (checkManagerExists.length == 0) {
         res.status(404).json({ manager_id, status: 'Not Found' });
      } else if (checkDepartmentExists.length == 0) {
         res.status(404).json({ department_id, status: 'Not Found' });
      } else {
         await employeesController.updateEmployee(
            id,
            first_name,
            last_name,
            email,
            phone_number,
            hire_date,
            job_id,
            salary,
            manager_id,
            department_id
         );

         res.status(200).json({ id, status: 'Employee successfully updated' });
      }
   } catch (error) {
      throw error;
   }
});

router.delete('/:id', async (req, res) => {
   const id = Number(req.params.id);
   try {
      const results = await employeesController.getById(id);

      if (results.length == 0) {
         res.status(404).json({ id, status: 'Not Found' });
      } else {
         await employeesController.deleteEmployee(id);
         res.status(204).json();
      }
   } catch (error) {
      throw error;
   }
});

module.exports = router;
