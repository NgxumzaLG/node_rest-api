const express = require('express');
const router = express.Router();
const locationsController = require('../controllers/locations');

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

      res.status(200).json(results);
   } catch (error) {
      throw error;
   }
});

router.post('/', async (req, res) => {
   const { location_id, street_address, postal_code, city, state_province, country_id } =
      req.body;
   try {
      await locationsController.addLocation(
         location_id,
         street_address,
         postal_code,
         city,
         state_province,
         country_id
      );

      res.status(201);
   } catch (error) {
      throw error;
   }
});

router.put('/:id', async (req, res) => {
   const id = Number(req.params.id);
   const { location_id, street_address, postal_code, city, state_province, country_id } =
      req.body;
   try {
      await locationsController.updateLocation(
         location_id,
         street_address,
         postal_code,
         city,
         state_province,
         country_id,
         id
      );

      res.status(200).json({ status: 'updated successfully' });
   } catch (error) {
      throw error;
   }
});

router.delete('/:id', async (req, res) => {
   const id = Number(req.params.id);
   try {
      await locationsController.deleteLocation(id);

      res.status(204);
   } catch (error) {
      throw error;
   }
});

module.exports = router;
