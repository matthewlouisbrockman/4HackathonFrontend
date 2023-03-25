//set API_ENDPOINT to the env for API_ENDPOINT
const API_ENDPOINT = process.env.API_ENDPOINT || "http://localhost:5000";

export const getActionFromInput = async ({ playerInput }) => {
  const response = await fetch(`${API_ENDPOINT}/generateNextMove`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ playerInput }),
  });
  return await response.json();
};
