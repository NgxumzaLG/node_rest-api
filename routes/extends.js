const express = require('express');
const router = express.Router();
const extendsController = require('../controllers/extends');

router.get('/highestSalary', async (req, res) => {
   try {
      const results = await extendsController.highestSalaryRange();

      res.status(200).json(results);
   } catch (error) {
      throw error;
   }
});

module.exports = router;
