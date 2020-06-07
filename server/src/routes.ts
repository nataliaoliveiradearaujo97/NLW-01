import express from 'express';

import ItemsController from './controllers/ItemsController';
import PersonalController from './controllers/PersonalController';

const routes = express.Router();
const itemsController = new ItemsController();
const personalController = new PersonalController();

routes.get('/items', itemsController.index);

routes.post('/personal', personalController.create);
routes.get('/personal/:id', personalController.show);
routes.get('/personal', personalController.index);

//index, show, create, udate, delete

export default routes;