const db = require('../models/db');

const getAll = async () => {
   const results = await db.query('SELECT * FROM dependents');
   return results.rows;
};

const getById = async (id) => {
   const query = `SELECT * FROM dependents 
                  WHERE dependent_id = $1`;

   const results = await db.query(query, [id]);
   return results.rows;
};

const addDependent = async (...dependent) => {
   const query = `INSERT INTO dependents (dependent_id, first_name, last_name, relationship, 
                  employee_id) 
                  VALUES ($1, $2, $3, $4, $5)`;

   await db.query(query, dependent);
   return;
};

const updateDependent = async (...dependent) => {
   const query = `UPDATE dependents SET dependent_id = $1, first_name = $2, last_name = $3,
                  relationship = $4, employee_id = $5
                  WHERE dependent_id = $6`;

   await db.query(query, dependent);
   return;
};

const deleteDependent = async (id) => {
   const query = `DELETE FROM dependents
                  WHERE dependent_id = $1`;

   await db.query(query, [id]);
   return;
};

module.exports = {
   getAll,
   getById,
   addDependent,
   updateDependent,
   deleteDependent,
};
