const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobs');

router.get('/', async (req, res) => {
   try {
      const results = await jobsController.getAll();

      res.status(200).json(results);
   } catch (error) {
      throw error;
   }
});

router.get('/:id', async (req, res) => {
   const id = Number(req.params.id);
   try {
      const results = await jobsController.getById(id);

      res.status(200).json(results);
   } catch (error) {
      throw error;
   }
});

router.post('/', async (req, res) => {
   const { job_id, job_title, min_salary, max_salary } = req.body;
   try {
      await jobsController.addJob(job_id, job_title, min_salary, max_salary);

      res.status(201);
   } catch (error) {
      throw error;
   }
});

router.put('/:id', async (req, res) => {
   const id = Number(req.params.id);
   const { job_id, job_title, min_salary, max_salary } = req.body;

   try {
      await jobsController.updateJob(job_id, job_title, min_salary, max_salary, id);

      res.status(200).json({ status: 'updated successfully' });
   } catch (error) {
      throw error;
   }
});

router.delete('/:id', async (req, res) => {
   const id = Number(req.params.id);
   try {
      await jobsController.deleteJob(id);

      res.status(204);
   } catch (error) {
      throw error;
   }
});

module.exports = router;
