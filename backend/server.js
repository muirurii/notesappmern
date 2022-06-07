const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000;
const cors = require('cors');
const connection = require('./database/db');

connection();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/users', require('./routes/user'));
app.use('/notes', require('./routes/notes'));

app.all('*', (req, res) => res.status(404).json({ message: 'Not Found' }));

app.use(require('./middleware/errorHandler'));

app.listen(PORT, () => console.log('Server started at port: ' + PORT));