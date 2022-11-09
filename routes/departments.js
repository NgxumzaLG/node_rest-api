const express = require('express');
const router = express.Router();
const departmentsController = require('../controllers/departments');
const locationsController = require('../controllers/locations');

router.get('/', async (req, res) => {
   try {
      const results = await departmentsController.getAll();

      res.status(200).json(results);
   } catch (error) {
      throw error;
   }
});

router.get('/:id', async (req, res) => {
   const id = Number(req.params.id);
   try {
      const results = await departmentsController.getById(id);

      if (results.length == 0) res.status(404).json({ id, status: 'Not Found' });
      else res.status(200).json(results);
   } catch (error) {
      throw error;
   }
});

router.post('/', async (req, res) => {
   const { department_id, department_name, location_id } = req.body;
   const id = Number(department_id);
   try {
      const checkDepartment = await departmentsController.getById(id);
      const checkLocationExists = await locationsController.getById(Number(location_id));

      if (checkDepartment.length > 0) {
         res.status(400).json({ id, status: 'Already exists' });
      } else if (checkLocationExists.length == 0) {
         res.status(404).json({ location_id, status: 'Not Found' });
      } else {
         await departmentsController.addDepartment(id, department_name, location_id);

         res.status(201).json({ id, status: 'Department successfully added' });
      }
   } catch (error) {
      throw error;
   }
});

router.put('/:id', async (req, res) => {
   const id = Number(req.params.id);
   const { department_name, location_id } = req.body;
   try {
      const checkDepartment = await departmentsController.getById(id);
      const checkLocationExists = await locationsController.getById(Number(location_id));

      if (checkDepartment.length == 0) {
         res.status(404).json({ id, status: 'Not Found' });
      } else if (checkLocationExists.length == 0) {
         res.status(404).json({ location_id, status: 'Not Found' });
      } else {
         await departmentsController.updateDepartment(id, department_name, location_id);

         res.status(200).json({ id, status: 'Department successfully updated' });
      }
   } catch (error) {
      throw error;
   }
});

router.delete('/:id', async (req, res) => {
   const id = Number(req.params.id);
   try {
      await departmentsController.deleteDepartment(id);

      res.status(204).json();
   } catch (error) {
      throw error;
   }
});

module.exports = router;
