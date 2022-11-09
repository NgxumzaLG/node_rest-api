const express = require('express');
const router = express.Router();
const locationsController = require('../controllers/locations');
const countriesController = require('../controllers/countries');

router.get('/', async (req, res) => {
   try {
      const results = await locationsController.getAll();

      res.status(200).json(results);
   } catch (error) {
      throw error;
   }
});

router.get('/:id', async (req, res) => {
   const id = Number(req.params.id);
   try {
      const results = await locationsController.getById(id);

      if (results.length == 0) res.status(404).json({ id, status: 'Not Found' });
      else res.status(200).json(results);
   } catch (error) {
      throw error;
   }
});

router.post('/', async (req, res) => {
   const { location_id, street_address, postal_code, city, state_province, country_id } =
      req.body;
   const id = Number(location_id);
   try {
      const checkLocation = await locationsController.getById(id);
      const checkCountryExists = await countriesController.getById(country_id);

      if (checkLocation.length > 0) {
         res.status(400).json({ id, status: 'Already exists' });
      } else if (checkCountryExists.length == 0) {
         res.status(404).json({ country_id, status: 'Not Found' });
      } else {
         await locationsController.addLocation(
            id,
            street_address,
            postal_code,
            city,
            state_province,
            country_id
         );

         res.status(201).json({ id, status: 'Location successfully added' });
      }
   } catch (error) {
      throw error;
   }
});

router.put('/:id', async (req, res) => {
   const id = Number(req.params.id);
   const { street_address, postal_code, city, state_province, country_id } = req.body;
   try {
      const checkLocation = await locationsController.getById(id);
      const checkCountryExists = await countriesController.getById(country_id);

      if (checkLocation.length == 0) {
         res.status(404).json({ id, status: 'Not Found' });
      } else if (checkCountryExists.length == 0) {
         res.status(404).json({ country_id, status: 'Not Found' });
      } else {
         await locationsController.updateLocation(
            id,
            street_address,
            postal_code,
            city,
            state_province,
            country_id
         );

         res.status(200).json({ id, status: 'Location successfully updated' });
      }
   } catch (error) {
      throw error;
   }
});

router.delete('/:id', async (req, res) => {
   const id = Number(req.params.id);
   try {
      await locationsController.deleteLocation(id);

      res.status(204).json();
   } catch (error) {
      throw error;
   }
});

module.exports = router;
