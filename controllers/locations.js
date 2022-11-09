const db = require('../models/db');

const getAll = async () => {
   const results = await db.query('SELECT * FROM locations');
   return results.rows;
};

const getById = async (id) => {
   const query = `SELECT * FROM locations 
                  WHERE location_id = $1`;

   const results = await db.query(query, [id]);
   return results.rows;
};

const addLocation = async (...location) => {
   const query = `INSERT INTO locations (location_id, street_address, postal_code, city,
                  state_province, country_id) 
                  VALUES ($1, $2, $3, $4, $5, $6)`;

   await db.query(query, location);
   return;
};

const updateLocation = async (...location) => {
   const query = `UPDATE locations SET street_address = $2, postal_code = $3, 
                  city = $4, state_province = $5, country_id = $6
                  WHERE location_id = $1`;

   await db.query(query, location);
   return;
};

const deleteLocation = async (id) => {
   const query = `DELETE FROM locations
                  WHERE location_id = $1`;

   await db.query(query, [id]);
   return;
};

module.exports = {
   getAll,
   getById,
   addLocation,
   updateLocation,
   deleteLocation,
};
