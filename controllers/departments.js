const db = require('../models/db');

const getAll = async () => {
   const results = await db.query('SELECT * FROM departments');
   return results.rows;
};

const getById = async (id) => {
   const query = `SELECT * FROM departments 
                  WHERE department_id = $1`;

   const results = await db.query(query, [id]);
   return results.rows;
};

const addDepartment = async (...department) => {
   const query = `INSERT INTO departments (department_id, department_name, location_id) 
                  VALUES ($1, $2, $3)`;

   await db.query(query, department);
   return;
};

const updateDepartment = async (...department) => {
   const query = `UPDATE departments SET department_id = $1, department_name = $2, location_id = $3
                  WHERE department_id = $4`;

   await db.query(query, department);
   return;
};

const deleteDepartment = async (id) => {
   const query = `DELETE FROM departments
                  WHERE department_id = $1`;

   await db.query(query, [id]);
   return;
};

module.exports = {
   getAll,
   getById,
   addDepartment,
   updateDepartment,
   deleteDepartment,
};
