import pg from "pg";

const {Client}=pg;

const connection =new Client({
  
        user: 'nitesh25',
        host: 'nitesh-pg.postgres.database.azure.com',
        database: 'postgres',
        password: 'ASqwe12@#',
        port: 5432, // Default PostgreSQL port,
        ssl:true,
      
})
export default connection;