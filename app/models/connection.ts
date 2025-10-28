import 'dotenv';
import mysql from 'mysql2/promise'

const connection = mysql.createPool({
  uri: process.env.DATABASE_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

connection.getConnection()
  .then(() => {
    console.log('Conectado ao banco de dados no Railway');
  })
  .catch((error) => {
    console.error('Erro ao conectar com o banco:', error.message);
  });

export default connection;