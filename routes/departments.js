const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', (req, res) => {
   db.query('SELECT * FROM departments', (error, results) => {
      if (error) throw error;

      res.status(200).json(results.rows);
   });
});

module.exports = router;
