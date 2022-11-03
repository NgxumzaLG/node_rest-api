const express = require('express');
const router = express.Router();
const departmentsController = require('../controllers/departments');

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

      res.status(200).json(results);
   } catch (error) {
      throw error;
   }
});

router.post('/', async (req, res) => {
   const { department_id, department_name, location_id } = req.body;
   try {
      await departmentsController.addDepartment(
         department_id,
         department_name,
         location_id
      );

      res.status(201);
   } catch (error) {
      throw error;
   }
});

router.put('/:id', async (req, res) => {
   const id = Number(req.params.id);
   const { department_id, department_name, location_id } = req.body;

   try {
      await departmentsController.updateDepartment(
         department_id,
         department_name,
         location_id,
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
      await departmentsController.deleteDepartment(id);

      res.status(204);
   } catch (error) {
      throw error;
   }
});

module.exports = router;
