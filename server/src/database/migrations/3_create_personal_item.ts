import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('personal_items', table => {
       table.increments('id').primary();
       
       table.integer('personal_id')
        .notNullable()
        .references('id')
        .inTable('personal');

       table.integer('item_id')
        .notNullable()
        .references('id')
        .inTable('items');;
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('personal_items');
}