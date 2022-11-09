const express = require('express');
const router = express.Router();
const regionsController = require('../controllers/regions');

router.get('/', async (req, res) => {
   try {
      const results = await regionsController.getAll();

      res.status(200).json(results);
   } catch (error) {
      throw error;
   }
});

router.get('/:id', async (req, res) => {
   const id = Number(req.params.id);
   try {
      const results = await regionsController.getById(id);

      if (results.length == 0) res.status(404).json({ id, status: 'Not Found' });
      else res.status(200).json(results);
   } catch (error) {
      throw error;
   }
});

router.post('/', async (req, res) => {
   const { region_id, region_name } = req.body;
   const id = Number(region_id);
   try {
      const checkRegion = await regionsController.getById(id);

      if (checkRegion.length == 0) {
         await regionsController.addRegion(id, region_name);

         res.status(201).json({ id, status: 'Region successfully added' });
      } else {
         res.status(400).json({ id, status: 'Already exists' });
      }
   } catch (error) {
      throw error;
   }
});

router.put('/:id', async (req, res) => {
   const id = Number(req.params.id);
   const { region_name } = req.body;
   try {
      const checkIfExists = await regionsController.getById(id);

      if (checkIfExists.length > 0) {
         await regionsController.updateRegion(id, region_name);

         res.status(200).json({ id, status: 'Region successfully updated' });
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
      await regionsController.deleteRegion(id);

      res.status(204).json();
   } catch (error) {
      throw error;
   }
});

module.exports = router;
