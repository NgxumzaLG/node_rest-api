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
   const id = req.params.id;
   try {
      const results = await dependentsController.getById(id);

      res.status(200).json(results);
   } catch (error) {
      throw error;
   }
});

module.exports = router;
