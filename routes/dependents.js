const express = require('express');
const router = express.Router();
const dependentsController = require('../controllers/dependents');
const employeesController = require('../controllers/employees');

router.get('/', async (req, res) => {
   try {
      const results = await dependentsController.getAll();

      res.status(200).json(results);
   } catch (error) {
      throw error;
   }
});

router.get('/:id', async (req, res) => {
   const id = Number(req.params.id);
   try {
      const results = await dependentsController.getById(id);

      if (results.length == 0) res.status(404).json({ id, status: 'Not Found' });
      else res.status(200).json(results);
   } catch (error) {
      throw error;
   }
});

router.post('/', async (req, res) => {
   const { dependent_id, first_name, last_name, relationship, employee_id } = req.body;
   const id = Number(dependent_id);
   try {
      const checkDependent = await dependentsController.getById(id);
      const checkEmployeeExists = await employeesController.getById(Number(employee_id));

      if (checkDependent.length > 0) {
         res.status(400).json({ id, status: 'Already exists' });
      } else if (checkEmployeeExists.length == 0) {
         res.status(404).json({ employee_id, status: 'Not Found' });
      } else {
         await dependentsController.addDependent(
            id,
            first_name,
            last_name,
            relationship,
            employee_id
         );

         res.status(201).json({ id, status: 'Dependent successfully added' });
      }
   } catch (error) {
      throw error;
   }
});

router.put('/:id', async (req, res) => {
   const id = Number(req.params.id);
   const { first_name, last_name, relationship, employee_id } = req.body;
   try {
      const checkDependent = await dependentsController.getById(id);
      const checkEmployeeExists = await employeesController.getById(Number(employee_id));

      if (checkDependent.length == 0) {
         res.status(404).json({ id, status: 'Not Found' });
      } else if (checkEmployeeExists.length == 0) {
         res.status(404).json({ employee_id, status: 'Not Found' });
      } else {
         await dependentsController.updateDependent(
            id,
            first_name,
            last_name,
            relationship,
            employee_id
         );

         res.status(200).json({ id, status: 'Dependent successfully updated' });
      }
   } catch (error) {
      throw error;
   }
});

router.delete('/:id', async (req, res) => {
   const id = Number(req.params.id);
   try {
      const results = await dependentsController.getById(id);

      if (results.length == 0) {
         res.status(404).json({ id, status: 'Not Found' });
      } else {
         await dependentsController.deleteDependent(id);
         res.status(204).json();
      }
   } catch (error) {
      throw error;
   }
});

module.exports = router;
