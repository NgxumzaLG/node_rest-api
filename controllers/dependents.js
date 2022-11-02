const db = require('../models/db');

const getAll = async () => {
   const results = await db.query('SELECT * FROM dependents');
   return results.rows;
};

const getById = async (id) => {
   const query = 'SELECT * FROM dependents WHERE dependent_id = $1';
   const results = await db.query(query, [id]);
   return results.rows;
};

module.exports = {
   getAll,
   getById,
};
