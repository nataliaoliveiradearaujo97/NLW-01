import Knex from 'knex';

export async function seed(knex: Knex){
    await knex('items').insert([
        {nome: 'Musculação', image: 'musculacao.svg'},
        {nome: 'Yoga', image: 'yoga.svg'},
        {nome: 'Aeróbido', image: 'aerobico.svg'},
        {nome: 'Alongamento', image: 'alongamento.svg'},
    ]);
}