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
   const id = req.params.id;
   try {
      const results = await employeesController.getById(id);

      res.status(200).json(results);
   } catch (error) {
      throw error;
   }
});

module.exports = router;
