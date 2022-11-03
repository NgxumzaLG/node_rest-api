const express = require('express');
const router = express.Router();
const countriesController = require('../controllers/countries');

router.get('/', async (req, res) => {
   try {
      const results = await countriesController.getAll();

      res.status(200).json(results);
   } catch (error) {
      throw error;
   }
});

router.get('/:id', async (req, res) => {
   const id = req.params.id;
   try {
      const results = await countriesController.getById(id);

      res.status(200).json(results);
   } catch (error) {
      throw error;
   }
});

router.post('/', async (req, res) => {
   const { country_id, country_name, region_id } = req.body;
   try {
      await countriesController.addCountry(country_id, country_name, region_id);

      res.status(201);
   } catch (error) {
      throw error;
   }
});

router.put('/:id', async (req, res) => {
   const id = req.params.id;
   const { country_id, country_name, region_id } = req.body;

   try {
      await countriesController.updateCountry(country_id, country_name, region_id, id);

      res.status(200).json({ status: 'updated successfully' });
   } catch (error) {
      throw error;
   }
});

router.delete('/:id', async (req, res) => {
   const id = req.params.id;
   try {
      await countriesController.deleteCountry(id);

      res.status(204);
   } catch (error) {
      throw error;
   }
});

module.exports = router;
