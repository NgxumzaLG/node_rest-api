const express = require('express');
const router = express.Router();
const dependentsController = require('../controllers/dependents');

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

      res.status(200).json(results);
   } catch (error) {
      throw error;
   }
});

router.post('/', async (req, res) => {
   const { dependent_id, first_name, last_name, relationship, employee_id } = req.body;
   try {
      await dependentsController.addDependent(
         dependent_id,
         first_name,
         last_name,
         relationship,
         employee_id
      );

      res.status(201);
   } catch (error) {
      throw error;
   }
});

router.put('/:id', async (req, res) => {
   const id = Number(req.params.id);
   const { dependent_id, first_name, last_name, relationship, employee_id } = req.body;
   try {
      await dependentsController.updateDependent(
         dependent_id,
         first_name,
         last_name,
         relationship,
         employee_id,
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
      await dependentsController.deleteDependent(id);

      res.status(204);
   } catch (error) {
      throw error;
   }
});

module.exports = router;
