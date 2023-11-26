import pg from "pg";

const {Client}=pg;

const connection =new Client({
  
        user: 'postgres',
        host: 'localhost',
        database: 'Nitesh',
        password: 'nitesh',
        port: 5432, // Default PostgreSQL port
      
})
export default connection;