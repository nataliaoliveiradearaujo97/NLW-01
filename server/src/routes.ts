import express from 'express'
import { celebrate, Joi } from 'celebrate';

import multer from 'multer';
import multerConfig from './config/multer';

import ItemsController from './controllers/ItemsController';
import PersonalController from './controllers/PersonalController';

const routes = express.Router();
const upload = multer(multerConfig);

const itemsController = new ItemsController();
const personalController = new PersonalController();

routes.get('/items', itemsController.index);

routes.post('/personal', 
    upload.single('image'), 
    //validação dos inputs
    celebrate({//esse tipo de validação funciona bem com o express
        body: Joi.object().keys({
            name: Joi.string().required(),
            nascimento: Joi.string().required(),
            sexo: Joi.string().required(),
            cpf: Joi.number().required().max(11),
            metodologia: Joi.string().required(),
            whatsapp: Joi.number().required(),
            email: Joi.string().required().email(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            cidade: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        })
    }, {
        abortEarly: false
    }),
    personalController.create);
routes.get('/personal/:id', personalController.show);
routes.get('/personal', personalController.index);

//index, show, create, udate, delete

export default routes;