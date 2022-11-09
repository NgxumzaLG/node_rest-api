const db = require('../models/db');

const highestSalaryRange = async () => {
   const query = `SELECT employees.*, jobs_updated.salary_range, jobs_updated.job_title,
                  jobs_updated.min_salary, jobs_updated.max_salary
                  FROM employees 
                  JOIN (SELECT * , (max_salary - min_salary) AS salary_range 
                  FROM jobs) AS jobs_updated ON employees.job_id = jobs_updated.job_id
                  ORDER BY jobs_updated.salary_range DESC LIMIT 1`;

   const results = await db.query(query);
   return results.rows;
};

const filterByJobTitle = async (jobTitle) => {
   const query = `SELECT e.*, d.department_name, j.job_title, j.min_salary, j.max_salary
                FROM employees AS e 
                JOIN departments AS d ON e.department_id = d.department_id
                JOIN jobs AS j ON e.job_id = j.job_id
                WHERE j.job_title = $1 `;

   const results = await db.query(query, [jobTitle]);
   return results.rows;
};

const employeesPagination = async (page, size) => {
   const query = `SELECT * FROM employees
                  ORDER BY employee_id
                  LIMIT $2
                  OFFSET (($1 - 1) * $2);`;

   const results = await db.query(query, [page, size]);
   return results.rows;
};

module.exports = { highestSalaryRange, filterByJobTitle, employeesPagination };
