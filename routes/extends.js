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

router.get('/employees', async (req, res) => {
   const { jobTitle } = req.query;
   try {
      if (jobTitle !== '') {
         const results = await extendsController.filterByJobTitle(jobTitle);

         res.status(200).json(results);
      } else {
         res.status(400).json({ status: 'Job title undefined' });
      }
   } catch (error) {
      throw error;
   }
});

router.get('/pag/employees', async (req, res) => {
   const { page, size } = req.query;
   console.log(page);
   try {
      if (page !== '' && size !== '') {
         const results = await extendsController.employeesPagination(
            Number(page),
            Number(size)
         );

         res.status(200).json(results);
      } else {
         res.status(400).json({ status: 'Use Numbers only' });
      }
   } catch (error) {
      throw error;
   }
});

module.exports = router;
