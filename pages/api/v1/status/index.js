import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  response.status(200).json({
    updated_at: updatedAt,
    // POSTGRES version
    // Max Connections
    // How many connections are currently open
  });
}

export default status;