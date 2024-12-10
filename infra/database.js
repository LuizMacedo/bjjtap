import { Client } from 'pg';

const getSSLValue = () => {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
      rejectUnauthorized: true,
    };
  }
  return false;
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
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

export default {
  query,
};