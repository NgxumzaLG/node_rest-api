const db = require('../models/db');

const getAll = async () => {
   const results = await db.query('SELECT * FROM employees');
   return results.rows;
};

const getById = async (id) => {
   const query = `SELECT * FROM employees 
                  WHERE employee_id = $1`;

   const results = await db.query(query, [id]);
   return results.rows;
};

const addEmployee = async (...employee) => {
   const query = `INSERT INTO employees (employee_id, first_name, last_name, email,
                  phone_number, hire_date, job_id, salary, manager_id, department_id) 
                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 )`;

   await db.query(query, employee);
   return;
};

const updateEmployee = async (...employee) => {
   const query = `UPDATE employees SET first_name = $2, last_name = $3, email = $4, phone_number = $5,
                  hire_date = $6, job_id = $7, salary = $8, manager_id = $9, department_id = $10
                  WHERE employee_id = $1`;

   await db.query(query, employee);
   return;
};

const deleteEmployee = async (id) => {
   const query = `DELETE FROM employees
                  WHERE employee_id = $1`;

   await db.query(query, [id]);
   return;
};

module.exports = {
   getAll,
   getById,
   addEmployee,
   updateEmployee,
   deleteEmployee,
};
