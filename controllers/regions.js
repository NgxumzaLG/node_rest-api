const db = require('../models/db');

const getAll = async () => {
   const results = await db.query('SELECT * FROM regions');
   return results.rows;
};

const getById = async (id) => {
   const query = `SELECT * FROM regions 
                  WHERE region_id = $1`;

   const results = await db.query(query, [id]);
   return results.rows;
};

const addRegion = async ({ region_id, region_name }) => {
   const query = `INSERT INTO regions (region_id, region_name) 
                  VALUES ($1, $2)`;

   await db.query(query, [region_id, region_name]);
   return;
};

const updateRegion = async (...region) => {
   const query = `UPDATE regions SET region_id = $1, region_name = $2 
                  WHERE region_id = $3`;

   await db.query(query, region);
   return;
};

module.exports = {
   getAll,
   getById,
   addRegion,
   updateRegion,
};
