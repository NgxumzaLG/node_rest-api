const db = require('../models/db');

const highestSalaryRange = async () => {
   const query = `SELECT employees.*, jobs_updated.salary_range, jobs_updated.job_title,
                  jobs_updated.min_salary, jobs_updated.max_salary
                  FROM employees 
                  JOIN (SELECT * , (max_salary - min_salary) AS salary_range 
                  FROM jobs) AS jobs_updated ON  employees.job_id = jobs_updated.job_id
                  ORDER BY jobs_updated.salary_range DESC LIMIT 1`;

   const results = await db.query(query);
   return results.rows;
};

module.exports = { highestSalaryRange };
