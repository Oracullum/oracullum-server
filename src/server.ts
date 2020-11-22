import express from 'express';
import path from 'path';
import cors from 'cors';

import UsersController from './app/controllers/UsersController';
import ExchangesController from './app/controllers/ExchangesController';
import StocksController from './app/controllers/StocksController';
import SessionsController from './app/controllers/SessionsController';
import EnterpriseController from './app/controllers/EnterpriseController';

import ensureAuthenticated from './app/middlewares/ensureAuthenticated'

import 'express-async-errors';

import './database/connection';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.post('/users', UsersController.create);
app.post('/sessions', SessionsController.create);

app.use(ensureAuthenticated)

app.post('/stocks', StocksController.create);
app.get('/stocks/:id', StocksController.show);
app.get('/stocks', StocksController.index);

app.post('/exchanges', ExchangesController.create);
app.get('/exchanges/:id', ExchangesController.show)
app.get('/exchanges', ExchangesController.index)

app.post('/enterprises', EnterpriseController.create);
app.get('/enterprises/:id', EnterpriseController.show)
app.get('/enterprises', EnterpriseController.index)

app.listen(3333);
