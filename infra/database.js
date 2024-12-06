import { Client } from 'pg';

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValue(),
  });

  console.log('Connecting to the database...');

  try {
    await client.connect();
    console.log('Successfully connected to the database.');

    console.log('Executing query:', queryObject);
    const result = await client.query(queryObject);
    console.log('Query executed successfully:', result);

    return result;
  }
  catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
  finally {
    await client.end();
    console.log('Database connection closed.');
  }
}

export default {
  query: query,
}

function getSSLValue() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }
  return process.env.NODE_ENV === "development" ? false : true;
}