const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employees');

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

      res.status(200).json(results);
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
   try {
      await employeesController.addEmployee(
         employee_id,
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

      res.status(201);
   } catch (error) {
      throw error;
   }
});

router.put('/:id', async (req, res) => {
   const id = Number(req.params.id);
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
   try {
      await employeesController.updateEmployee(
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
         id
      );

      res.status(200).json({ status: 'updated successfully' });
   } catch (error) {
      throw error;
   }
});

router.delete('/:id', async (req, res) => {
   const id = Number(req.params.id);
   try {
      await employeesController.deleteEmployee(id);

      res.status(204);
   } catch (error) {
      throw error;
   }
});

module.exports = router;
