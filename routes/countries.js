const express = require('express');
const router = express.Router();
const countriesController = require('../controllers/countries');
const regionsController = require('../controllers/regions');

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

      if (results.length == 0) res.status(404).json({ id, status: 'Not Found' });
      else res.status(200).json(results);
   } catch (error) {
      throw error;
   }
});

router.post('/', async (req, res) => {
   const { country_id, country_name, region_id } = req.body;
   try {
      const checkCountry = await countriesController.getById(country_id);
      const checkRegionExists = await regionsController.getById(Number(region_id));

      if (checkCountry.length > 0) {
         res.status(400).json({ id: country_id, status: 'Already exists' });
      } else if (checkRegionExists.length == 0) {
         res.status(404).json({ region_id, status: 'Not Found' });
      } else {
         await countriesController.addCountry(
            country_id,
            country_name,
            Number(region_id)
         );

         res.status(201).json({ id: country_id, status: 'Country successfully added' });
      }
   } catch (error) {
      throw error;
   }
});

router.put('/:id', async (req, res) => {
   const id = req.params.id;
   const { country_name, region_id } = req.body;

   try {
      const checkCountry = await countriesController.getById(id);
      const checkRegionExists = await regionsController.getById(Number(region_id));

      if (checkCountry.length == 0) {
         res.status(404).json({ id, status: 'Not Found' });
      } else if (checkRegionExists.length == 0) {
         res.status(404).json({ region_id, status: 'Not Found' });
      } else {
         await countriesController.updateCountry(id, country_name, Number(region_id));

         res.status(200).json({ id, status: 'Country successfully updated' });
      }
   } catch (error) {
      throw error;
   }
});

router.delete('/:id', async (req, res) => {
   const id = req.params.id;
   try {
      await countriesController.deleteCountry(id);

      res.status(204).json();
   } catch (error) {
      throw error;
   }
});

module.exports = router;
