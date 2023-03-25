//set API_ENDPOINT to the env for API_ENDPOINT
const API_ENDPOINT =
  process.env.REACT_APP_API_ENDPOINT || "http://localhost:5000";

export const getActionFromInput = async ({ playerInput, gameId }) => {
  const response = await fetch(`${API_ENDPOINT}/generateNextMove`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ playerInput, gameId }),
  });
  return await response.json();
};
