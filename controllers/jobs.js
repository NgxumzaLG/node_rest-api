const db = require('../models/db');

const getAll = async () => {
   const results = await db.query('SELECT * FROM jobs');
   return results.rows;
};

const getById = async (id) => {
   const query = `SELECT * FROM jobs 
                  WHERE job_id = $1`;

   const results = await db.query(query, [id]);
   return results.rows;
};

const addJob = async (...job) => {
   const query = `INSERT INTO jobs (job_id, job_title, min_salary, max_salary) 
                  VALUES ($1, $2, $3, $4)`;

   await db.query(query, job);
   return;
};

const updateJob = async (...job) => {
   const query = `UPDATE jobs SET job_title = $2, min_salary = $3, max_salary = $4
                  WHERE job_id = $1`;

   await db.query(query, job);
   return;
};

const deleteJob = async (id) => {
   const query = `DELETE FROM jobs
                  WHERE job_id = $1`;

   await db.query(query, [id]);
   return;
};

module.exports = {
   getAll,
   getById,
   addJob,
   updateJob,
   deleteJob,
};
