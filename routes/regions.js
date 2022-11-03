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

      res.status(200).json(results);
   } catch (error) {
      throw error;
   }
});

router.post('/', async (req, res) => {
   const { region_id, region_name } = req.body;
   try {
      await regionsController.addRegion(region_id, region_name);

      res.status(201);
   } catch (error) {
      throw error;
   }
});

router.put('/:id', async (req, res) => {
   const id = Number(req.params.id);
   const { region_id, region_name } = req.body;
   try {
      await regionsController.updateRegion(region_id, region_name, id);

      res.status(200).json({ status: 'updated successfully' });
   } catch (error) {
      throw error;
   }
});

router.delete('/:id', async (req, res) => {
   const id = Number(req.params.id);
   try {
      await regionsController.deleteRegion(id);

      res.status(204);
   } catch (error) {
      throw error;
   }
});

module.exports = router;
