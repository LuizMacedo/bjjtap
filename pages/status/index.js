import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();

  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status Page</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { data, error } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  if (error) return <p>Error loading data</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <p>Updated at: {new Date(data.updated_at).toLocaleString()}</p>
    </div>
  );
}

function DatabaseStatus() {
  const { data, error } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  if (error) return <p>Error loading data</p>;

  return (
    <div>
      <h2>Database</h2>
      {!data ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Version: {data.dependencies.database.version}</p>
          <p>
            Opened connections: {data.dependencies.database.opened_connections}
          </p>
          <p>Max connections: {data.dependencies.database.max_connections}</p>
        </>
      )}
    </div>
  );
}
