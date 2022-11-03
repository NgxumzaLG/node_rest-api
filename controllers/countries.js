const db = require('../models/db');

const getAll = async () => {
   const results = await db.query('SELECT * FROM countries');
   return results.rows;
};

const getById = async (id) => {
   const query = `SELECT * FROM countries 
                  WHERE country_id = $1`;

   const results = await db.query(query, [id]);
   return results.rows;
};

const addCountry = async (...country) => {
   const query = `INSERT INTO countries (country_id, country_name, region_id) 
                  VALUES ($1, $2, $3)`;

   await db.query(query, country);
   return;
};

const updateCountry = async (...country) => {
   const query = `UPDATE countries SET country_id = $1, country_name = $2, region_id = $3
                  WHERE country_id = $4`;

   await db.query(query, country);
   return;
};

const deleteCountry = async (id) => {
   const query = `DELETE FROM countries
                  WHERE country_id = $1`;

   await db.query(query, [id]);
   return;
};

module.exports = {
   getAll,
   getById,
   addCountry,
   updateCountry,
   deleteCountry,
};
