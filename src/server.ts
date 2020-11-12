import express from 'express';
import path from 'path';
import cors from 'cors';

import UsersController from './app/controllers/UsersController';
import StocksController from './app/controllers/StocksController';

import 'express-async-errors';

import './database/connection';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.post('/users', UsersController.create);

app.post('/stocks', StocksController.create);
app.get('/stocks/:id', StocksController.show);
app.get('/stocks', StocksController.index);

app.listen(3333);
