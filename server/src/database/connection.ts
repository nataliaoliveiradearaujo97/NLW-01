import knex from 'knex';
import path from 'path';

const connection = knex({
    client: 'sqlite3',
    connection: {
        //__dirname: variavel global que retorna o diretorio do arquivo executado
        filename: path.resolve(__dirname, 'database.sqlite'),
    },
    useNullAsDefault: true,
});

export default connection;

//Executar o banco: npm run knex:migrate
//Insert na table items: npn run knex:seed
