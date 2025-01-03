import { Client } from "pg";

async function query(queryObject) {
  let client;
  try {
    client = await getNewClient();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.log("Error inside the catch block of the database.js:");
    console.error(error);
    throw error;
  } finally {
    await client?.end();
  }
}

async function getNewClient() {
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

  await client.connect();
  return client;
}

const database = {
  query,
  getNewClient,
};

export default database;

const getSSLValue = () => {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA, // Use the CA certificate provided in the environment variable
      rejectUnauthorized: true, // Enforces strict certificate validation
    };
  }

  // Default SSL settings for development or missing CA certificate
  return process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: true }
    : false;
};
