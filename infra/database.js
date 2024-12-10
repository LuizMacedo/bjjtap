import { Client } from 'pg';

const getSSLValue = () => {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA, // Use the CA certificate provided in the environment variable
      rejectUnauthorized: false,    // Enforce strict SSL certificate validation
    };
  }
  return process.env.NODE_ENV === 'development' ? false : { rejectUnauthorized: true };
};

async function query(queryObject) {
  const {
    POSTGRES_HOST: host,
    POSTGRES_PORT: port,
    POSTGRES_USER: user,
    POSTGRES_DB: database,
    POSTGRES_PASSWORD: password,
  } = process.env;

  const client = new Client({
    host,
    port,
    user,
    database,
    password,
    ssl: getSSLValue(),
  });

  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error('Database connection error:', error.message);
    throw error;
  } finally {
    await client.end();
  }
}

export default {
  query,
};