import 'dotenv';
import mysql from 'mysql2/promise'

const NODE_ENV = process.env.NODE_ENV || "development";
let connection = mysql.createPool({
  uri: process.env.LOCALHOST_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

if (NODE_ENV === "development") {
  connection.getConnection()
    .then(() => {
      console.log('Conectado ao banco de dados no ambiente de desenvolvimento.');
    })
    .catch((error) => {
      console.error('Erro ao conectar com o banco:', error.message);
    });
}

if (NODE_ENV === "production") {
  connection = mysql.createPool({
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
}

if (NODE_ENV === "tests") {
  connection = mysql.createPool({
    uri: process.env.TESTS_DB_URL,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  connection.getConnection()
    .then(() => {
      console.log('Conectado ao banco de dados no ambiente de testes.');
    })
    .catch((error) => {
      console.error('Erro ao conectar com o banco:', error.message);
    });
}


export default connection;