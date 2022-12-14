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

      if (results.length == 0) res.status(404).json({ id, status: 'Not Found' });
      else res.status(200).json(results);
   } catch (error) {
      throw error;
   }
});

router.post('/', async (req, res) => {
   const { job_id, job_title, min_salary, max_salary } = req.body;
   const id = Number(job_id);
   try {
      const checkJob = await jobsController.getById(id);

      if (checkJob.length == 0) {
         await jobsController.addJob(
            id,
            job_title,
            Number(min_salary),
            Number(max_salary)
         );

         res.status(201).json({ id, status: 'Job successfully added' });
      } else {
         res.status(400).json({ id, status: 'Already exists' });
      }
   } catch (error) {
      throw error;
   }
});

router.put('/:id', async (req, res) => {
   const id = Number(req.params.id);
   const { job_title, min_salary, max_salary } = req.body;

   try {
      const checkJob = await jobsController.getById(id);

      if (checkJob.length > 0) {
         await jobsController.updateJob(
            id,
            job_title,
            Number(min_salary),
            Number(max_salary)
         );

         res.status(200).json({ id, status: 'Job successfully updated' });
      } else {
         res.status(404).json({ id, status: 'Not Found' });
      }
   } catch (error) {
      throw error;
   }
});

router.delete('/:id', async (req, res) => {
   const id = Number(req.params.id);
   try {
      const results = await jobsController.getById(id);

      if (results.length == 0) {
         res.status(404).json({ id, status: 'Not Found' });
      } else {
         await jobsController.deleteJob(id);
         res.status(204).json();
      }
   } catch (error) {
      throw error;
   }
});

module.exports = router;
