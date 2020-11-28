import express from 'express';
import path from 'path';
import cors from 'cors';

import UsersController from './app/controllers/UsersController';
import ExchangesController from './app/controllers/ExchangesController';
import StocksController from './app/controllers/StocksController';
import SessionsController from './app/controllers/SessionsController';
import EnterpriseController from './app/controllers/EnterpriseController';
import ExchangeEnterpriseController from './app/controllers/ExchangeEnterpriseController';
import HistoricTransactionalController from './app/controllers/HistoricTransactionalController';

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

app.post('/exchanges-enterprises', ExchangeEnterpriseController.create);
app.get('/exchanges-enterprises/:id', ExchangeEnterpriseController.show)
app.get('/exchanges-enterprises', ExchangeEnterpriseController.index)

app.post('/historic-transactionals', HistoricTransactionalController.create);
app.get('/historic-transactionals/:id', HistoricTransactionalController.show)
app.get('/historic-transactionals', HistoricTransactionalController.index)

app.listen(3333);
