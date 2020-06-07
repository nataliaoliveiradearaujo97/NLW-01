import Knex from 'knex';

export async function up(knex: Knex){
    //criar tabela
    return knex.schema.createTable('personal', table => {
        table.increments('id').primary();
        table.string('image').nullable();
        table.string('nome').notNullable();
        table.string('nascimento').notNullable();
        table.string('sexo', 1).notNullable();
        table.integer('cpf', 11).notNullable();
        table.string('metodologia').notNullable();
        table.integer('whatsapp').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('cidade').notNullable();
        table.string('uf', 2).notNullable();
        table.string('email').notNullable();
    });
}

export async function down(knex: Knex){
    //remover a tabela
    return knex.schema.dropTable('personal');
}

//npm run knex:migrate
//npx lnex migrate:latest --knexfile knexfile.ts migrate:latest
//npm run kenx:seed