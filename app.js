const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

const indexRouter = require('./routes/');
const regionsRouter = require('./routes/regions');
const countriesRouter = require('./routes/countries');
const locationsRouter = require('./routes/locations');
const departmentsRouter = require('./routes/departments');
const jobsRouter = require('./routes/jobs');
const employeesRouter = require('./routes/employees');
const dependentsRouter = require('./routes/dependents');
const extendsRouter = require('./routes/extends');

dotenv.config();
const app = express();
const port = process.env.PORT || '3000';

app.set('port', port);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/regions', regionsRouter);
app.use('/countries', countriesRouter);
app.use('/locations', locationsRouter);
app.use('/departments', departmentsRouter);
app.use('/jobs', jobsRouter);
app.use('/employees', employeesRouter);
app.use('/dependents', dependentsRouter);
app.use('/extends', extendsRouter);

app.listen(port, () => {
   console.log(`Server listening at http://localhost:${port}`);
});
