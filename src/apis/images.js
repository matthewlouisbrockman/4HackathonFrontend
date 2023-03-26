//set API_ENDPOINT to the env for API_ENDPOINT
const API_ENDPOINT =
  process.env.REACT_APP_API_ENDPOINT || "http://localhost:5000";

export const getMonsterImage = async ({ name }) => {
  const response = await fetch(`${API_ENDPOINT}/getMonsterImage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  return await response.json();
};

export const getLocationImage = async ({ name }) => {
  const response = await fetch(`${API_ENDPOINT}/getLocationImage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  return await response.json();
};
