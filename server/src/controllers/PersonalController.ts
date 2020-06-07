import { Request, Response } from 'express';
import knex from '../database/connection';

class PersonalController {
    async index (request: Request, response: Response) {
        try {
            //cidade, uf, items (query params)
            const { cidade, uf, items } = request.query;

            const itemsId = String(items)
            .split(',')
            .map(item => Number(item.trim()));

            const personal = await knex('personal')
                .join('personal_items', 'personal.id', '=', 'personal_items.id')
                .whereIn('personal_items.item_id', itemsId)
                .where('cidade', String(cidade))
                .where('uf', String(uf))
                .distinct()
                .select('personal.*');

            const serializedPersonal = personal.map(personal => {
                return {
                    ...personal, 
                    image_url: `http://192.168.0.16:3333/uploads/${personal.image}`
                }
            })

            return response.json(serializedPersonal);
        } catch (error) {
            console.log(error);
        }
    }
    
    async show (request: Request, response: Response) {
        try {
            const { id } = request.params;

            const personal = await knex('personal').where('id', id).first();

            if(!personal) {
                return response.status(400).json({ message: 'Personal não encontrado' });
            }

            const serializedPersonal = {
                ...personal, 
                image_url: `http://192.168.0.16:3333/uploads/${personal.image}`
            }

            /**
             * select * from personal p
             * inner join items i on i.idItems = p.idItems
             * where p.idItems = {id}
            */
            const items = await knex('items')
                .join('personal_items', 'items.id', '=', 'personal_items.id')
                .where('personal_items.id', id)
                .select('items.nome');

            return response.json({ serializedPersonal, items });
        } catch (error) {
            console.log(error);
        }
    }

    async create (request: Request, response: Response) {
        try {
            const {
                nome,
                nascimento,
                sexo,
                cpf,
                metodologia,
                whatsapp,
                latitude,
                longitude,
                cidade,
                uf,
                email,
                items
            } = request.body;

            console.log(request.body);
    
            const trx = await knex.transaction();
    
            const personal = {
                image: request.file.filename,
                nome,
                nascimento,
                sexo,
                cpf,
                metodologia,
                whatsapp,
                latitude,
                longitude,
                cidade,
                uf,
                email
            }
    
            const insertedIds = await trx('personal').insert(personal);
    
            const personal_id = insertedIds[0];
    
            const personalItems = await items
                .split(',')
                .map((item:string) => item.trim())
                .map((item_id: number) => {
                    return {
                        item_id,
                        personal_id
                    }
            })
    
            await trx('personal_items').insert(personalItems);
    
            await trx.commit();
    
            return response.json({ 
                id: personal_id,
                ...personal,
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default PersonalController;